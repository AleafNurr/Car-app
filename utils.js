/**
 * This file stores all utility functions
 */

/**
 * Linear interpolation
 * @returns value between A and B by t
 */
export function lerp(A, B, t){
    return A + (B-A)*t;
}

/**
 * Returns the intersection of two lines
 * @param {Object} A - first point of first line
 * @param {Object} B - second point of first line
 * @param {Object} C - first point of second line
 * @param {Object} D - second point of second line
 * @returns {Object} - intersection point
 * @returns {Number} - offset of intersection point on the first line
 * @returns {null} - if no intersection
 */

export function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

/**
 * Determines if two polygons intersect
 * @param {*} A - first polygon 
 * @param {*} B - second polygon
 * @returns {Boolean} - true if the two polygons intersect 
 */
export function polysIntersect(A, B){
    for(let i = 0; i < A.length; i++){
        for(let j = 0;j < B.length; j++){
            const touch=getIntersection(
                A[i],
                A[(i+1)%A.length],
                B[j],
                B[(j+1)%B.length]
            );
            if(touch){
                return true;
            }
        }
    }
    return false;
}