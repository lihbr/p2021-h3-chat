// Can only edit his own document

exports._design_lock_email = function(newDoc, oldDoc, userCtx) {
  if (userCtx.roles.indexOf("_admin") === -1) {
    if (!oldDoc) {
      throw { forbidden: "You're not allowed to create new documents here." };
    } else if (oldDoc.email !== newDoc.email) {
      throw { forbidden: "doc.email can't be edited directly by a user." };
    }
  }
}.toString();

/* www.minifier.org
function(newDoc,oldDoc,userCtx){if(userCtx.roles.indexOf("_admin")===-1){if(!oldDoc){throw{forbidden:"You're not allowed to create new documents here."}}else if(oldDoc.email!==newDoc.email){throw{forbidden:"doc.email can't be edited directly by a user."}}}}
*/
