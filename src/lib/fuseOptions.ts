import { IFuseOptions } from "fuse.js";

const fuseOptions: IFuseOptions<any> = {
    keys: ['title','director', 'genre'],
    includeScore: true,
    threshold: 0.3,
};

export { fuseOptions };
