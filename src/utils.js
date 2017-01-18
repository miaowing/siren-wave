/**
 * Created by zhaofeng on 2016/11/1.
 */
export function extend(to, from) {
    let keys = Object.keys(from);
    let i = keys.length;
    while (i--) {
        to[keys[i]] = from[keys[i]]
    }
    return to
}