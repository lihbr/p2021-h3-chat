// Can only edit his own document

exports._design_lock_public_name_slug_hash = function(newDoc, oldDoc, userCtx) {
  if (userCtx.roles.indexOf("_admin") === -1) {
    if (!oldDoc) {
      throw { forbidden: "You're not allowed to create new documents here." };
    } else if (
      oldDoc.public !== newDoc.public ||
      oldDoc.name !== newDoc.name ||
      oldDoc.slug !== newDoc.slug ||
      oldDoc.hash !== newDoc.hash
    ) {
      throw {
        forbidden:
          "doc.public/name/slug/hash can't be edited directly by a user."
      };
    }
  }
}.toString();

/* www.minifier.org
function(newDoc,oldDoc,userCtx){if(userCtx.roles.indexOf("_admin")===-1){if(!oldDoc){throw{forbidden:"You're not allowed to create new documents here."}}else if(oldDoc.public!==newDoc.public||oldDoc.name!==newDoc.name||oldDoc.slug!==newDoc.slug||oldDoc.hash!==newDoc.hash){throw{forbidden:"doc.public/name/slug can't be edited directly by a user."}}}}
*/
