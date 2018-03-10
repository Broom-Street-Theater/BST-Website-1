namespace BST {
    export class ScrollableShowPhotos extends View {

        protected _data: IPhoto[];

        protected _shouldSkipCreateElements(): boolean { return true; }

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".scrollablePhotoBase": {
                position: "fixed",
                zIndex: "-1"
            }
        }

        constructor(data: IPhoto[]) {
            super();
            this._data = data;
            this._createElements();
        }

        protected _createElements(): void {
            this._elems.base = KIP.createElement({
                cls: "scrollablePhotoBase"
            });

            let layer: HTMLElement = KIP.createElement({
                cls: "scrollablePhotos",
                parent: this._elems.base
            });

            // loop through each of the photos
            let photo: IPhoto;
            let cnt: number = 0;
            for (photo of this._data) {
                cnt += 1;
                let photoElem: HTMLElement = this._createPhoto(photo, cnt);
                layer.appendChild(photoElem);
            }

            slowScroll(this._elems.base);
        }

        protected _createPhoto(photo: IPhoto, cnt: number): HTMLElement {
            let photoWrapper: HTMLElement = KIP.createElement({
                cls: "photoWrapper",
            });

            let photoElem: HTMLElement = KIP.createElement({
                type: "img",
                attr: {
                    src: photo.url
                },
                parent: photoWrapper
            });

            let credits: HTMLElement = KIP.createElement({
                content: photo.photographer,
                cls: "photoCreds",
                parent: photoWrapper
            });

            

            return photoWrapper;
        }


    }
}