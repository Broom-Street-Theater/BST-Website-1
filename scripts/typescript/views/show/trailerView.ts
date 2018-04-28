namespace BST {

    const VIMEO_FMT: string = "<iframe src='{0}?autoplay=0&loop=1&autopause=1' width='100%' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
    const YOUTUBE_FMT: string = "<iframe id='ytplayer' type='text/html' width='100%' src='{0}?autoplay=0&origin=http://bstonline.org' frameborder='0'></iframe>";

    const YOUTUBE_SAMPLE: string = "https://www.youtube.com/watch?v=dilZpMFsohE";
    const VIMEO_SAMPLE: string = "https://vimeo.com/65107797";

    export interface ITrailerElems extends IViewElements {
        videoHost: HTMLElement;
        iframe: HTMLElement;
    }

    export class TrailerView extends View {

        protected _elems: ITrailerElems;

        protected _data: ITrailer;

        protected _playListeners: Function[];

        protected _pauseListeners: Function[];

        protected _isPaused: boolean;

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".trailer": {

                nested: {
                    ".videoContainer": {

                        nested: {
                            "iframe": {

                            }
                        }
                    }
                }
            }
        }

        public set data(trailerInfo: ITrailer) { 
            this._data = trailerInfo; 
            this._pauseListeners = [];
            this._playListeners = [];
            this._createElements(); 
        }

        protected _createElements(): void {
            if (!this._data) { return; }
            this._elems = {} as any;
            this._elems.base = KIP.createElement({ cls: "trailer" });
            this._elems.videoHost = KIP.createElement({ cls: "videoContainer", parent: this._elems.base });

            this._elems.iframe = KIP.createElement({
                type : "iframe",
                cls: "video",
                attr: {
                    frameborder: "0",
                    width: "100%",
                    allowfullscreen: "0"
                }
            });

            let innerIFrame: string;
            switch (this._data.type) {
                case TrailerType.YOUTUBE:
                    innerIFrame = KIP.format(YOUTUBE_FMT, this._data.link);
                    break;
                case TrailerType.VIMEO:
                    innerIFrame = KIP.format(VIMEO_FMT, this._data.link);
                    break;
                case TrailerType.OTHER:
                    break;
            }

            this._elems.videoHost.innerHTML = innerIFrame;

            this._elems.iframe = this._elems.videoHost.children[0] as HTMLIFrameElement;

            this._elems.videoHost.addEventListener("click", () => {
                let listeners: Function[];
                if (this._isPaused) {
                    this._isPaused = false;
                    listeners = this._playListeners;
                } else {
                    this._isPaused = true;
                    listeners = this._pauseListeners;
                }

                for (let listener of listeners) {
                    if (!listener) { continue; }
                    listener();
                }   
            })
        }

        public addPlayListener(listener: Function): void {
            this._playListeners.push(listener);
        }

        public addPauseListeners(listener: Function): void {
            this._pauseListeners.push(listener);
        }

    }
}