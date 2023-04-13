
// Example Usage:
// createACLs([[["Alice"], ["READ"]]])
// createACLs([[["Alice"], ["READ"], "name"]])
// createACLs([[["Alice"], ["READ"], "name"], [["Bob"], ["ALL", "UPDATE_ACL"], "name"]])
// Can only do the below call where we have a list of paths if those paths are not referenced again
// createACLs([[["Alice"], ["READ"], ["name", "uuid"]], [["Bob"], ["ALL", "UPDATE_ACL"], "name"]])
// Missing error handling: The code assumes that the input parameter "acls" is an array and that each
// element of the array is itself an array with either 2 or 3 elements. If either of these assumptions
// is not true, the code will likely throw an error or produce unexpected results. There is no error
// handling in the code to check for these scenarios.
// A function that takes an array of ACLs and returns an array of dacls
const createACLs = acls => {
    // An empty array that will hold the dacls
    const dacls = [];
    // Loop through each acl in the acls array
    for (const acl of acls) {
        // If the acl has 2 elements, push a dacl with a principal and operations property
        if (acl.length === 2) {
            dacls.push({
                principal: {
                    nodes: acl[0]
                },
                operations: acl[1]
            });
        } else {
            // If the acl has 3 elements, check if the 3rd element is a string or an array
            if (typeof acl[2] === "string") {
                // If the 3rd element is a string, push a dacl with a principal, path and operations property
                dacls.push({
                    principal: {
                        nodes: acl[0]
                    },
                    path: acl[2],
                    operations: acl[1]
                });
            } else {
                // If the 3rd element is an array, loop through the array and push a dacl for each element with a principal, path and operations property
                for (let j = 0; j < acl[2].length; j++) {
                    dacls.push({
                        principal: {
                            nodes: acl[0]
                        },
                        path: acl[2][j],
                        operations: acl[1]
                    });
                }
            }
        }
    }
    console.log("dacls", dacls);
    // Return the dacls array
    return dacls;
}


//var crypto = require('crypto');
// Source: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
/*const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}*/
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


export { createACLs, uuidv4 };
