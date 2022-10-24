import xs, {Stream, Listener} from 'xstream';

export type CBAPI = (...args: Array<any>) => void;
export type xsAPI<T> = (...args: Array<any>) => Stream<T>;

function xsFromCallback<T>(api: CBAPI): xsAPI<T> {
  return (...args) =>
    xs.create<T>({
      start(listener: Listener<T>) {
        let replied: boolean = false;
        api(...args, (err: any, data: T) => {
          if (replied) {
            console.warn(
              'xstream-from-callback got multiple replies',
              err,
              data,
              api,
            );
            return;
          }
          replied = true;
          if (err === true) {
            listener.complete();
          } else if (err) {
            listener.error(err);
          } else {
            listener.next(data);
          }
        });
      },
      stop() {},
    });
}

export default xsFromCallback;
