export class Gauss {
    #ready = false;
    #second = 0.0;

    next(mean = undefined, dev = undefined) {
        mean = mean === undefined ? 0.0 : mean;
        dev = dev === undefined ? 1.0 : dev;

        if (this.#ready) {
            this.#ready = false;
            return this.#second * dev + mean;
        }
        else {
            let u, v, s;
            do {
                u = 2.0 * Math.random() - 1.0;
                v = 2.0 * Math.random() - 1.0;
                s = u * u + v * v;
            } while (s > 1.0 || s === 0.0);

            let r = Math.sqrt(-2.0 * Math.log(s) / s);
            this.#second = r * u;
            this.#ready = true;
            return r * v * dev + mean;
        }
    };
}