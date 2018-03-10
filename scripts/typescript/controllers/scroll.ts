namespace BST {

    var scrollDistance: number = 0;
    const SLOW_SCROLL: number = -0.4;    // Slow scroll is half the pace of the rest
    const FAST_SCROLL: number = -1.5;
    const OFFSET_TOP: number = 150;
    const TRANSPARENCY_SCALE: number = .01;
    const TRANSFORM_SCALE: number = .001;


    export enum SCROLL_TYPE {
        SLOW_SCROLL = 1,
        REVERSE_SLOW_SCROLL = 2,
        FAST_SCROLL = 3
    }

    export interface IScrollableElem {
        type: SCROLL_TYPE;
        elem: HTMLElement;
        origPt: KIP.IPoint
    };

    export var scrollers: IScrollableElem[] = [];

    export function scrollTo (elemID: string, target?: number, forceTarget?: boolean) : void {
        let elem: HTMLElement = document.getElementById(elemID);
        if (!elem) { return; }

        if (!forceTarget && (elem.offsetHeight < (window.innerHeight - target))) {
            target = null;
        }
        
        KIP.Helpers.scrollTo(elem, target);
    }

    /** let an element scroll slower than the rest of the page */
    export function slowScroll (elem: HTMLElement) : void {
        let origPt: KIP.IPoint = {
            x: 0, 
            y: parseInt(elem.style.top) || elem.offsetTop
        };

        let scrollableElem: IScrollableElem = {
            elem: elem,
            origPt: origPt,
            type: SCROLL_TYPE.SLOW_SCROLL
        };
        scrollers.push(scrollableElem);
    }

    /** allow an element to scroll slower than the rest - assigns negative values */
    export function slowReverseScroll (elem: HTMLElement): void {
        let origPt: KIP.IPoint = {
            x: 0, 
            y: parseInt(elem.style.top) || elem.offsetTop
        };
        let scrollableElem: IScrollableElem = {
            elem: elem,
            origPt: origPt,
            type: SCROLL_TYPE.REVERSE_SLOW_SCROLL
        };
        scrollers.push(scrollableElem);
    }

    /** handles the slow scrolling */
    function onSlowScroll (elem: HTMLElement, originalPosition: KIP.IPoint, curPosition: KIP.IPoint, reverse?: boolean) : void {
        let deltaDistance: number = curPosition.y;
        let tmp: number = deltaDistance * (reverse? -1 * SLOW_SCROLL: SLOW_SCROLL);
        elem.style.top = (originalPosition.y + tmp) + "px";
    }

    /** scroll an element faster than the rest of the screen */
    export function fastScroll (elem: HTMLElement) : void {
        // window.addEventListener("scroll", (e: Event) => {
        //     onFastScroll(e, elem);
        // });
    }

    /** handles the fast scrolling */
    function onFastScroll(e: Event, elem: HTMLElement) : void {
        let scrollPosition: KIP.IPoint = KIP.getScrollPosition();
        let deltaDistance: number = scrollPosition.y - scrollDistance;
        scrollDistance = scrollPosition.y;

        // Subtract the appropriate amount from the top / left vars
        let tmp: number = deltaDistance * FAST_SCROLL;
        deltaDistance = tmp - deltaDistance;

        KIP.moveElemRelativePosition(elem, {x: 0, y: deltaDistance});
    }

    /** use the built in  animation stuff */
    // handleScrollAnimation();
    // function handleScrollAnimation () {
    //     let scrollPosition: KIP.IPoint = KIP.getScrollPosition();
    //     scrollers.map((elem: IScrollableElem) => {
    //         if (elem.type === SCROLL_TYPE.FAST_SCROLL) { return; }
    //         let reverse: boolean =  (elem.type === SCROLL_TYPE.REVERSE_SLOW_SCROLL);
    //         onSlowScroll(elem.elem, elem.origPt, scrollPosition, reverse);
    //     });
    //     window.requestAnimationFrame(() => { handleScrollAnimation(); });
    // }

    window.addEventListener("scroll", (e: Event) => {
        let scrollPosition: KIP.IPoint = KIP.getScrollPosition();
        scrollers.map((elem: IScrollableElem) => {
            if (elem.type === SCROLL_TYPE.FAST_SCROLL) { return; }
            let reverse: boolean =  (elem.type === SCROLL_TYPE.REVERSE_SLOW_SCROLL);
            onSlowScroll(elem.elem, elem.origPt, scrollPosition, reverse);
        });
    });

}