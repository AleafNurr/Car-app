/**
 * This file stores all utility functions
 */

/**
 * Linear interpolation
 * @returns value between A and B by t
 */
function lerp(A, B, t){
    return A + (B-A)*t;
}