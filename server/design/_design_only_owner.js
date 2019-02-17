// Can only edit his own document

const _design_only_owner = function(newDoc, oldDoc, userCtx) {
  if (userCtx.roles.indexOf("_admin") === -1) {
    if (!oldDoc) {
      throw { forbidden: "You're not allowed to create new documents here." };
    } else if (oldDoc.owner !== userCtx.name || newDoc.owner !== userCtx.name) {
      throw { forbidden: "doc.owner must be the same as your username." };
    }
  }
};

/* www.minifier.org
function(newDoc,oldDoc,userCtx){if(userCtx.roles.indexOf("_admin")===-1){if(!oldDoc){throw{forbidden:"You're not allowed to create new documents here."}}else if(oldDoc.owner!==userCtx.name||newDoc.owner!==userCtx.name){throw{forbidden:"doc.owner must be the same as your username."}}}}
*/
