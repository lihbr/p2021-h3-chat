// Can only edit his own document

const _design_lock_md5 = function(newDoc, oldDoc, userCtx) {
  if (userCtx.roles.indexOf("_admin") === -1) {
    if (!oldDoc) {
      throw { forbidden: "You're not allowed to create new documents here." };
    } else if (oldDoc.md5 !== newDoc.md5) {
      throw { forbidden: "doc.md5 can't be edited directly by a user." };
    }
  }
};

/* www.minifier.org
function(newDoc,oldDoc,userCtx){if(userCtx.roles.indexOf("_admin")===-1){if(!oldDoc){throw{forbidden:"You're not allowed to create new documents here."}}else if(oldDoc.md5!==newDoc.md5){throw{forbidden:"doc.md5 can't be edited directly by a user."}}}}
*/
