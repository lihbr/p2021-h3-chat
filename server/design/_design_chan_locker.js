// Can only edit his own document

exports._design_chan_locker = function(newDoc, oldDoc, userCtx) {
  function required(field, message) {
    message = message || "Document must have a '" + field + "' field";
    if (newDoc[field] === null || newDoc[field] === undefined)
      throw { forbidden: message };
  }

  // If new doc only
  if (!oldDoc) {
    required("author");
    required("date");
    required("msg");
    required("edited");

    var now = Date.now();
    var min = now - 60000;

    var docDate = parseInt(newDoc._id.split("_")[0]);

    if (docDate !== newDoc.date) {
      throw { forbidden: "doc._id date part does not match doc.date." };
    } else if (newDoc.date < min) {
      throw { forbidden: "doc.date is too old, retry." };
    } else if (newDoc.date > now) {
      throw { forbidden: "doc.date cannot be from the future." };
    }
  }

  // If not deleted
  if (!newDoc._deleted) {
    if (typeof newDoc.msg !== "string") {
      throw { forbidden: "doc.msg must be a string." };
    }
  }

  // If not admin
  if (userCtx.roles.indexOf("_admin") === -1) {
    // If edited
    if (oldDoc) {
      if (newDoc.edited !== true) {
        throw { forbidden: "doc.edited must be set to true on edition." };
      }
      if (oldDoc.date !== newDoc.date) {
        throw { forbidden: "doc.date cannot be modified" };
      }
    }
    // If not owner
    if (
      (oldDoc && oldDoc.author !== userCtx.name) ||
      newDoc.author !== userCtx.name
    ) {
      throw {
        forbidden:
          "doc.author cannot be edited or you are not the owner of this doc."
      };
    }
  }
}.toString();

/* www.minifier.org
function(newDoc,oldDoc,userCtx){function required(field,message){message=message||"Document must have a "+field+" field";if(newDoc[field]===null||newDoc[field]===undefined)
throw{forbidden:message}}
if(!newDoc._deleted){required("author");required("date");required("msg");required("edited")}
if(userCtx.roles.indexOf("_admin")===-1){if((oldDoc&&oldDoc.author!==userCtx.name)||newDoc.author!==userCtx.name||(oldDoc&&oldDoc.date!==newDoc.date)||newDoc.date||(oldDoc&&oldDoc.edited===!0&&oldDoc.edited!==newDoc.edited)){throw{forbidden:"doc.author/date/edited cannot be edited."}}}
if(!oldDoc){var now=Date.now();var min=now-60000;var docDate=parseInt(newDoc._id.split("_")[0]);if(docDate!==newDoc.date){throw{forbidden:"doc._id date part does not match doc.date."}}else if(newDoc.date<min){throw{forbidden:"doc.date is too old, retry."}}else if(newDoc.date>now){throw{forbidden:"doc.date cannot be from the future."}}}}
*/
