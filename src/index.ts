import xs, { Stream, Listener, Producer } from "xstream";

export type CBAPI = (...args: Array<any>) => void;
export type xsAPI<T> = (...args: Array<any>) => Stream<T>;

function xsFromCallback<T>(api: CBAPI): xsAPI<T> {
  return (...args) =>
    xs.create<T>({
      start(listener: Listener<T>) {
        api(...args, (err: any, data: T) => {
          if (err) {
            listener.error(err);
          } else {
            listener.next(data);
          }
        });
      },
      stop() {}
    });
}

export default xsFromCallback;
