declare namespace KIP {
    interface IEqualityFunction<T> {
        (a: T, b: T): boolean;
    }
    /**...........................................................................
     * contains
     * ...........................................................................
     * Determine whether a particular element is contained in an array
     *
     * @param 	arr		The array to check
     * @param 	value 	The value to check for
     *
     * @returns	True if the value is contained in the array
     * ...........................................................................
     */
    function contains<T>(arr: T[], value: T): boolean;
    /**...........................................................................
     * indexOf
     * ...........................................................................
     * Find the index of a particular value in the array
     *
     * @param	arr		The array to search
     * @param	value	The value to look for
     *
     * @returns	The first index of the value in the array or -1 if it doesn't exist
     * ...........................................................................
     */
    function indexOf<T>(arr: T[], value: T, equalityFunction?: IEqualityFunction<T>): number;
    /**...........................................................................
     * remove
     * ...........................................................................
     * Remove a value (or all instances of a value) from the array
     *
     * @param	arr			The array to remove from
     * @param	value		The value to search for
     * @param	removeAll	If true, finds all instances of the value in the array
     *
     * @returns	The array with all instances of the value removed
     * ...........................................................................
     */
    function remove<T>(arr: T[], value: T, removeAll?: boolean, equalityFunction?: IEqualityFunction<T>): T[];
}
declare namespace KIP {
    function cloneRect(rect: IBasicRect): IBasicRect;
    function clonePoint(point: IPoint): IPoint;
    function clonePointArray(points: IPoint[]): IPoint[];
    /**...........................................................................
     * cloneObject
     * ...........................................................................
     * Generic function to try to clone any object, using JSON stringify + parse
     *
     * @param 	obj		The object to clone
     *
     * @returns	The cloned elements
     * ...........................................................................
     */
    function cloneObject<T>(obj: T): T;
}
declare namespace KIP {
    interface IComplexEnumItem {
        displayName: string;
        value: number;
    }
    interface IComplexEnum {
        [key: string]: IComplexEnumItem;
    }
}
declare namespace KIP {
    const THEME_BG_COLOR_CLS: string;
    const THEME_COLOR_CLS: string;
    const THEME_COLOR_HOVER_CLS: string;
    /**...........................................................................
     * addClass
     * ...........................................................................
     * Allows a user to safely add a CSS class to an element's existing list of CSS classes
     * @param {HTMLElement}   elem      The element that should have its class updated
     * @param {string}        newClass  The class to add the element
     * ...........................................................................
     */
    function addClass(elem: DrawableElement, newClass: string): void;
    /**...........................................................................
     * removeClass
     * ...........................................................................
     * Allows a user to safely remove a CSS class to an element's existing list of CSS classes
     * @param {HTMLElement} elem      The element that should have its class updated
     * @param {string}      newClass  The class to remove from the element
     * ...........................................................................
     */
    function removeClass(elem: HTMLElement | Drawable, oldClass: string): void;
    /**...........................................................................
     * hasClass
     * ...........................................................................
     * Checks whether a provided HTML element has a CSS class applied
     * @param  {HTMLElement}  elem  The element to check
     * @param  {String}       cls   The CSS class to check for
     * @return {Boolean}            True if the element has the CSS class applied; false otherwise
     * ...........................................................................
     */
    function hasClass(elem: HTMLElement | Drawable, cls: string): boolean;
    /**
     * Sets the CSS definition for a given class and attribute.
     *
     * @param {string} cls   - The class to change
     * @param {string} item  - The attribute within the class to update
     * @param {string} val   - The new value to set the attribute to
     * @param {bool} force   - If true, will create the CSS attribute even if it doesn't exist
     *
     * @return {bool} True if the CSS was successfully set, false otherwise
     */
    function setProperty(cls: string, item: string, val: string, force?: boolean): boolean;
    /**
     * Grabs the value of a given CSS class's attribute
     *
     * @param {string} cls  - The CSS class to look within
     * @param {string} item - The attribute we want to grab the value for
     *
     * @return {string} The value of that particular CSS class's attribute
     */
    function getProperty(cls: any, item: any): string;
    /**
     * Creates a CSS class and adds it to the style of the document
     * @param  {string}      selector   CSS selector to use to define what elements get this style
     * @param  {any}         attr       Array of css attributes that should be applied to the class
     * @param  {boolean}     [noAppend] True if we shouldn't actually add the class to the documment yet
     * @return {HTMLElement}            The CSS style tag that was created
     */
    function createClass(selector: string, attr: IClassDefinition | IKeyValPair<string>[], noAppend?: boolean): HTMLElement;
    /**
     * Gets the computed style of a given element
     *
     * @param {HTMLElement} elem - The element we are getting the style of
     * @param {string} attr - If passed in, the attribute to grab from the element's style
     *
     * @return {string} Either the particular value for the passed in attribute, or the whole style array.
     */
    function getComputedStyle(elem: Drawable | HTMLElement, attr: string): CSSStyleDeclaration | string;
    /** adds a generic hidden class to the document */
    function addHiddenClass(): void;
    /** Adds the "unselectable" class definition to the document */
    function addUnselectableClass(): void;
}
declare namespace KIP.Dates {
    /**
     * @file Helper functions for working with dates
     * @author Kip Price
     * @version 1.0
     * @since 1.1
     */
    interface IDateDifferences {
        years?: number;
        months?: number;
        days?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
        milliseconds?: number;
    }
    /**
     *	Finds the difference in days between two date objects
     *	@param {Date} a - The first date to compare
     *	@param {Date} b - The second date to compare
     *	@param {Boolean} [signed] - If true, will take the difference in order passed in (e.g. A - B)
     *	@param {Boolean} [includeTime] - If true, will take the ms difference instead of the day difference
     *  @param {boolean} [returnMilli] - If true, returns a value in milliseconds even if milliseconds weren't compared
     **/
    function dateDiff(a: Date, b: Date, signed?: boolean, includeTime?: boolean, returnMilli?: boolean): number;
    /**
     * Grabs the current day, default without any time data
     * @param  {boolean} include_time - True if we shouldn't exclude time data
     * @return {Date}                 Today's date
     */
    function getToday(include_time?: boolean): Date;
    /**
     * Clear out all time info associated with the date, including the timezone
     * @param date - the original date to clear data from
     * @returns The time-agnostic date
     */
    function clearTimeInfo(date: Date, clearTZ?: boolean): Date;
    /**
     * Compares two dates to determine the business day difference between them
     * @param a - The first date to compare
     * @param b - The second date to compare
     * @param signed - True if we should compare the dates in order (e.g. Date A - Date B)
     * @param includeTime - If true, also compares the time
     * @param returnMilli - Returns the date difference in milliseconds instead of days
     * @returns The business-date diff between the 2 dates
     */
    function businessDateDiff(a: Date, b: Date, signed?: boolean, includeTime?: boolean, returnMilli?: boolean): number;
    /**
     * Gets the display string of the date in a short format (MM/DD/YYYY)
     * @param {Date} dt - The date to get the short date for
     */
    function shortDate(dt: Date): string;
    /**
     * Converts the date into the format used by date inputs
     * @param {Date} dt - The date to convert
     */
    function inputDateFmt(dt: Date): string;
    /**
     * Takes a string returned by an input field for a date and converts it to a JS date
     * @param {string} iDt - The date string to convert (if available)
     * @param {string} iTime - The time string to convert (if available)
     */
    function inputToDate(iDt?: string, iTime?: string): Date;
    /**
     * Gets the display string of the time in a short format (HH:MM)
     * @param {Date} dt - The date to extract the time from
     * @param {Boolean} withExtra - If true, will display as HH:MM AM/PM instead of military time
     */
    function shortTime(dt: Date, withExtra?: boolean): string;
    /**
     * Gets the display string for a date and time
     * @param {Date} dt - The date to extract the formatted string from
     * @param {Boolean} withExtra - If true, uses AM/PM format instead of military time.
     */
    function shortDateTime(dt: Date, with_extra?: boolean): string;
    function stopwatchDisplay(milli: number, noLeadingZeros: any, noBlanks: any): string;
    function addToDate(date: Date, counts: IDateDifferences): Date;
    /**
     * gets the name of the month given a particular date
     * @param date - the date to get the month from
     * @param [short] - If true, returns the short version of the month name
     * @returns string of month name
     */
    function getMonthName(date: Date, short?: boolean): string;
    /**
     * Get Day Of Week
     * @param date - the date to grab the d.o.w. from
     * @param [short] - If true, returns the short version of the month name
     * @returns string of day-of-week name
     */
    function getDayOfWeek(date: Date, short?: boolean): string;
    /** grab the short version of the year */
    function getShortYear(date: Date): number;
    function isWeekend(date: Date): boolean;
    function isToday(date: Date): boolean;
    function isSameDate(dateA: Date, dateB: Date): boolean;
    /**
     * getDisplayDuration
     *
     * Create a display string for a time duration
     * @param 	counts	The duration to stringify
     * @returns	The display duration string
     *
     */
    function getDisplayDuration(counts: IDateDifferences): string;
}
declare namespace KIP {
    var IS_DEBUG: boolean;
    /**...........................................................................
     * printObject
     * ...........................................................................
     * @param obj
     * ...........................................................................
     */
    function printObject(obj: any): void;
    /**...........................................................................
     * getObjectString
     * ...........................................................................
     *
     * @param   obj         The object to print
     * @param   prefix      The current prefix to use for this layer
     *
     * @returns The created string
     * ...........................................................................
     */
    function getObjectString(obj: any, prefix?: string): string;
}
declare namespace KIP {
    interface IAttributes {
        [key: string]: any;
    }
    interface IChildren {
        [key: number]: HTMLElement | IElemDefinition;
    }
    interface IClasses {
        [key: string]: IClassDefinition | IKeyValPair<string>[];
    }
    interface IClassDefinition {
        [key: string]: string;
    }
    /**...........................................................................
     * IElemDefinition
     * ...........................................................................
     * Interface for how elements are created
     * @version 1.2
     * ...........................................................................
     */
    interface IElemDefinition {
        /** Id to use for the element */
        id?: string;
        /** CSS class to use for the element */
        cls?: string | IClasses;
        /** the type of HTML element we are creating */
        type?: "div" | "span" | "input" | "select" | "option" | "textarea" | "li" | "ul" | "p" | "br" | string;
        /** content that should be added to the element */
        content?: string;
        /** content that should specifically be added before the children of this element */
        before_content?: string;
        /** content that should specifically be added after the children of this element */
        after_content?: string;
        /** any additional attributes that should be applied to this element */
        attr?: IAttributes;
        /** any children that should be added for this element */
        children?: IChildren;
        /** the parent element that this should be added to */
        parent?: HTMLElement;
        /** allow callers to add event listeners while creating elements */
        eventListeners?: IEventListeners;
    }
    /**
     * keep track of event listeners of a particular type
     */
    type IEventListeners = {
        [key in keyof WindowEventMap]?: EventListener;
    };
    /**...........................................................................
     * CreateSimpleElement
     * ...........................................................................
     * Creates a div element with the provided id, class, content, and attributes.
     *
     * @param {string} id - The ID to assign the element {optional}
     * @param {string} cls - The class to assign the element {optional}
     * @param {string} content - What to include as the contents of the div {optional}
     * @param {arr} attr - An array of key-value pairs that sets all other attributes for the element
     *
     * @return {HTMLElement} The created element, with all specified parameters included.
     * ...........................................................................
     */
    function createSimpleElement(id?: string, cls?: string | IClasses, content?: string, attr?: IAttributes, children?: IChildren, parent?: HTMLElement): HTMLElement;
    /**...........................................................................
     * createElement
     * ...........................................................................
     * Creates an HTML element with the attributes that are passed in through the
     * object.
     *
     * @param   obj   The object to base the element off of
     * @returns The HTML element with all attributes specified by the object
     * ...........................................................................
     */
    function createElement(obj: IElemDefinition): HTMLElement;
    /**...........................................................................
     * createSimpleLabeledElement
     * ...........................................................................
     * Create an element and an associated label
     *
     * @param   id        ID to use for the labeled elem container
     * @param   cls       CSS class to use for the
     * @param   lbl       Text of the label
     * @param   content   Content of the element that is being labeled
     * @param   children  Any additional child elements
     * @param   parent    The node this element should be added to
     * @param   skipZero  True if we should not draw anything if the content is 0
     *
     * @returns The created element + label
     * ...........................................................................
     */
    function createSimpleLabeledElement(id: string, cls: string, lbl: string, content: any, attr: IAttributes, children: IChildren, parent: HTMLElement, skipZero: boolean): HTMLElement;
    interface ILabeledElement {
        data: HTMLElement;
        lbl: HTMLElement;
        wrapper: HTMLElement;
    }
    /**...........................................................................
     * createLabeledElement
     * ...........................................................................
     * Create an element along with a label
     *
     * @param   dataElem    Specs by which the data element should be created
     * @param   labelElem   Specs by which the label element should be created
     *
     * @returns The labeled element
     * ...........................................................................
     */
    function createLabeledElement(dataElem: IElemDefinition, labelElem: IElemDefinition): ILabeledElement;
    /**...........................................................................
     * GlobalOffsetLeft
     * ...........................................................................
     * Gets the offset left of this element in reference to the entire page
     *
     * @param   elem    The element to get the offset of
     * @param   parent  The parent element to use as the reference. If not
     *                  included, it uses the document.body as the reference
     *
     * @returns The global offset of the elememt from the left of the page (or
     *          parent, if included)
     * ...........................................................................
     */
    function globalOffsetLeft(elem: HTMLElement, parent?: HTMLElement): number;
    /**...........................................................................
     * GlobalOffsetTop
     * ...........................................................................
     * Gets the offset top of this element in reference to the entire page
     *
     * @param   elem   The element to get the offset of
     * @param   parent The parent element to use as the reference. If not
     *                 included, it uses the document.body as the reference
     *
     * @returns The global offset of the elememt from the top of the page (or
     *          parent, if included)
     * ...........................................................................
     */
    function globalOffsetTop(elem: HTMLElement, parent?: HTMLElement): number;
    /**...........................................................................
     * GlobalOffsets
     * ...........................................................................
     * Gets both the left and top offset
     *
     * @param   elem    The element to get the offsets for
     * @param   parent  The element to use as the reference frame
     *
     * @returns Object with the keys "left" and "top"
     * ...........................................................................
     */
    function globalOffsets(elem: HTMLElement, parent?: HTMLElement): {
        left: number;
        top: number;
    };
    /**...........................................................................
     * findCommonParent
     * ...........................................................................
     * Finds the closest shared parent between two arbitrary elements
     *
     * @param   elem_a    The first element to find the shared parent for
     * @param   elem_b    The second element to find the shared parent for
     *
     * @returns The closest shared parent, or undefined if it doesn't exist or
     *          an error occurred.
     * ...........................................................................
     */
    function findCommonParent(elem_a: HTMLElement, elem_b: HTMLElement): HTMLElement;
    /**...........................................................................
     * moveRelToElement
     * ...........................................................................
     * Moves a given element to a position relative to the reference element.
     *
     * This is for cases where you have two elements with different parents, and
     * you want to specify that element A is some number of pixels in some
     * direction compared to element B.
     *
     * @param   elem    The element to move
     * @param   ref     The element to use as the reference element
     * @param   x       The x offset to give this element, relative to the reference
     * @param   y       The y offset to give this element, relative to the reference
     * @param   no_move If set to false, only returns the offset_x and offset_y that
     *                  the element would have to be moved {optional}
     *
     * @returns An object containing the keys x and y, set to the offset applied to the element.
     * ...........................................................................
     */
    function moveRelToElem(elem: HTMLElement, ref: HTMLElement, x?: number, y?: number, no_move?: boolean): {
        x: number;
        y: number;
    };
    /**...........................................................................
     * removeSubclassFromAllElenents
     * ...........................................................................
     * Allows you to easily remove a subclass from all elements that have a certain
     * main class. Useful for things like button selection
     *
     * @param   cls       The main class to find all elements of
     * @param   subcls    The sub class to remove from all of those elements
     * @param   exception If needed, a single element that should
     *                    not have its subclass removed.
     * ...........................................................................
     */
    function removeSubclassFromAllElements(cls: string, subcls: string, exception?: HTMLElement): void;
    /**...........................................................................
   * isChildEventTarget
   * ...........................................................................
   * Checks if a child of the current task is being targeted by the event
   *
   * @param   ev    The event that is being triggered
   * @param   root  The parent to check for
   *
   * @returns True if the event is being triggered on a child element of the
   *          root element, false otherwise
   * ...........................................................................
   */
    function isChildEventTarget(ev: Event, root: HTMLElement): boolean;
    /**...........................................................................
     * isChild
     * ...........................................................................
     * Checks if an element is a child of the provided parent element
     *
     * @param   root    The parent to check for
     * @param   child   The element to check for being a child of the root node
     * @param   levels  The maximum number of layers that the child can be
     *                  separated from its parent. Ignored if not set.
     *
     * @returns True if the child has the root as a parent
     * ...........................................................................
     */
    function isChild(root: HTMLElement, child: HTMLElement): boolean;
    /**...........................................................................
     * AppendChildren
     * ...........................................................................
     * Appends an arbitrary number of children to the specified parent node. Loops
     * through all members of the argument list to get the appropriate children
     * to add.
     *
     * @param   parent  The parent element to add children to
     * @param   kids    Any children that should be appended
     * ...........................................................................
     */
    function appendChildren(parent: HTMLElement, ...kids: HTMLElement[]): void;
    /**...........................................................................
     * moveElemRelativePosition
     * ...........................................................................
     * Moves an element a relative anount
     *
     * @param   elem      The element to move
     * @param   distance  The relative distance to move
     * ...........................................................................
     */
    function moveElemRelativePosition(elem: HTMLElement, distance: IPoint): void;
    /**...........................................................................
     * getScrollPosition
     * ...........................................................................
     * Determines how far we have scrolled down the page
     *
     * @returns The point of the current scroll position
     * ...........................................................................
     */
    function getScrollPosition(): IPoint;
}
declare namespace KIP {
    /**...........................................................................
     * _normalizeValue
     * ...........................................................................
     * make sure a value is not past the relevant extrema
     *
     * @param	val		The value to normalize
     * @param	min     The minimum this value can be
     * @param   max     The maximum this value can be
     *
     * @returns The normalized value
     * ...........................................................................
     */
    function normalizeValue(val: number, min?: number, max?: number): number;
    /**...........................................................................
     * boundedRandomNumber
     * ...........................................................................
     * Find a random number between two values
     *
     * @param   max             The maximum value accepted
     * @param   min             The minimun value accepted. Defaults to 0
     * @param   isExclusive     True if we should exclude the max/min values
     *
     * @returns A random number fitting these parameters
     * ...........................................................................
     */
    function boundedRandomNumber(max: number, min?: number, isExclusive?: boolean): number;
    /**...........................................................................
     * roundToPlace
     * ...........................................................................
     * Helper function to round a number to a particular place
     *
     * @param   num     The number to round
     * @param   place   A multiple of 10 that indicates the decimal place to round
     *                  to. I.e., passing in 100 would round to the hundredths
     *                  place
     *
     * @returns The rounded number
     * ...........................................................................
     */
    function roundToPlace(num: number, place: number): number;
}
declare namespace KIP {
    abstract class Navigator<T extends string> {
        /** keep track of the views */
        private _views;
        /** keep track of the parent element */
        protected readonly abstract _parent: HTMLElement;
        navigateTo<D extends Drawable>(navigationPath: T, constructor?: IConstructor<D>, ...addlArgs: any[]): void;
    }
}
declare namespace KIP {
    interface IKeyValPair<T> {
        key?: string;
        val?: T;
    }
    type IMappedType<T> = {
        [K in keyof T]?: T[K];
    };
    interface ISelectOptions {
        [value: number]: string;
    }
    /**...........................................................................
     * IConstructor
     * ...........................................................................
     * Generic tracker of a constructor function
     * ...........................................................................
     */
    interface IConstructor<T> {
        new (...addlArgs: any[]): T;
    }
    /**...........................................................................
     * IToggleBtnOptions
     * ...........................................................................
     * Keep track of options for toggle buttons
     * ...........................................................................
     */
    interface IToggleBtnOption<T> {
        label: string;
        value: T;
    }
    /**...........................................................................
     * IDictionary
     * ...........................................................................
     * generic interface for key value pairs
     * ...........................................................................
     */
    interface IDictionary {
        [key: string]: any;
    }
    /**...........................................................................
       * IMapFunction
       * ...........................................................................
       * allow for map function, similar to Array.map
       * ...........................................................................
       */
    interface IMapFunction<T> {
        (elem: T, key: string | number, idx: number): void;
    }
    /**...........................................................................
     * IQuitConditionFunction
     * ...........................................................................
     * Determine whether we should stop looping over code
     * ...........................................................................
     */
    interface IQuitConditionFunction {
        (): boolean;
    }
    /**...........................................................................
     * map
     * ...........................................................................
     * Loop through all keys in an object or array and perform an action on each
     * element. Similar to Array.map.
     *
     * @param   object      The object to loop through
     * @param   callback    What to do with each element
     * @param   shouldQuit  Function to evaluate whether we are done looping
     * ...........................................................................
     */
    function map(object: any, callback: IMapFunction<any>, shouldQuit?: IQuitConditionFunction): void;
    /**...........................................................................
     * getNextKey
     * ...........................................................................
     * Grab the next keyed element in an object. This is terribly un-performant in
     * all but the first key case.
     *
     * @param   object    The object to get the key from
     * @param   lastKey   If provided, the key before the key we're looking for
     *
     * @returns The next key for this element
     * ...........................................................................
     */
    function getNextKey(object: any, lastKey?: string): string;
    /**...........................................................................
     * removeElemFromArr
     * ...........................................................................
     * Finds & removes an element from the array if it exists.
     *
     * @param   arr     The array to remove from
     * @param   elem    The element to remove
     * @param   equal   The function that is used to test for equality
     * ...........................................................................
     */
    function removeElemFromArr<T>(arr: T[], elem: T, equal?: Function): T[];
    /**...........................................................................
     * combineObjects
     * ...........................................................................
     * Take two separate objects and combine them into one
     *
     * @param   objA    First object to combine
     * @param   objB    Second object to combine
     * @param   deep    True if this should be recursive
     *
     * @returns The combined object
     * ...........................................................................
     */
    function combineObjects(objA: {}, objB: {}, deep?: boolean): {};
    /**...........................................................................
     * reconcileOptions
     * ...........................................................................
     * Takes in two different option objects & reconciles the options between them
     *
     * @param   options    The user-defined set of option
     * @param   defaults   The default options
     *
     * @returns The reconciled option list
     * ...........................................................................
     */
    function reconcileOptions<T extends IDictionary>(options: T, defaults: T): T;
    /**...........................................................................
     * isNullOrUndefined
     * ...........................................................................
     * Determine whether the data passed in has value
     *
     * @param   value   The value to check for null / undefined
     *
     * @returns True if the value is null or undefined
     * ...........................................................................
     */
    function isNullOrUndefined(value: any): boolean;
}
declare namespace KIP {
    interface KipPromiseFunction {
        (resolve: Function, reject: Function): any;
    }
    /**...........................................................................
     * @class KipPromise
     * Create a promise class to run async calls in a chained fashion
     * @version 1.0
     * ...........................................................................
     */
    class KipPromise implements Promise<any> {
        /** keep track of what this promise should do after completion */
        protected _thenListener: Function;
        /** keep track of what this promise should do after an error */
        protected _catchListener: Function;
        /**...........................................................................
         * Creates a promise elements that runs a bit of code asynchronously
         *
         * @param   func    The code to run
         * ...........................................................................
         */
        constructor(func: KipPromiseFunction);
        /**...........................................................................
         * then
         * ...........................................................................
         * Public function to setup what should run after this promise completes
         *
         * @param   onThen  The function to run on completion
         *
         * @returns This promise
         * ...........................................................................
         */
        then(onThen: Function): KipPromise;
        /**...........................................................................
         * catch
         * ...........................................................................
         * Register the function that should catch any errors that occur
         *
         * @param   onCatch     The function that will handle catching
         *
         * @returns This promise
         * ...........................................................................
         */
        catch(onCatch: Function): KipPromise;
        /**...........................................................................
         * resolve
         * ...........................................................................
         * Called when the promise has been successfully resolved
         * @param params
         * ...........................................................................
         */
        protected _resolve(...params: any[]): void;
        /**...........................................................................
         * _reject
         * ...........................................................................
         * Called when the promise failed to resolve for some reason
         * @param params
         * ...........................................................................
         */
        protected _reject(...params: any[]): void;
        /**...........................................................................
         * resolve
         * ...........................................................................
         * return a promise that will immediately resolve
         *
         * @param   any arguments that should be passed to the resolve function
         * ...........................................................................
         */
        static resolve(...params: any[]): KipPromise;
        /**...........................................................................
         * reject
         * ...........................................................................
         * return a promise that will be rejected
         * ...........................................................................
         */
        static reject(...params: any[]): KipPromise;
    }
}
declare namespace KIP {
    namespace Helpers {
        /**---------------------------------------------------------------------------
         * scrollTo
         * ---------------------------------------------------------------------------
         * animate a scroll to a particular element
         * @param 	elem  	the element to scroll to
         * @param 	toTop 	if true, ensures that the top of the element is at the top
         * 					of the screen
         * --------------------------------------------------------------------------
         */
        function scrollTo(elem: HTMLElement, targetPosition?: number): void;
    }
}
declare namespace KIP {
    /**...........................................................................
     * enum to keep track of the types of AJAX requesr
     * @version 1.0
     * ...........................................................................
     */
    enum AjaxTypeEnum {
        POST = 1,
        GET = 2,
    }
    /**...........................................................................
     * @interface IAjaxSuccessFunction
     * @version 1.0
     * handle when an ajax request ends in a success
     * ...........................................................................
     */
    interface IAjaxSuccessFunction {
        (response: string): void;
    }
    /**...........................................................................
     * @interface IAjaxErrorFunction
     * @version 1.0
     * handle when an ajax request ends in a failure
     * ...........................................................................
     */
    interface IAjaxErrorFunction {
        (response: string): void;
    }
    /**...........................................................................
     * @interface IAjaxParams
     * @version 1.0
     * keeps track of parameters that will be sent in an AJAX call
     * ...........................................................................
     */
    interface IAjaxParams {
        [ajaxKey: string]: string;
    }
    /**...........................................................................
     * ajaxRequest
     * ...........................................................................
     * Sends an AJAX request to a url of our choice as either a POST or GET
     *
     * @param   type        Set to either "POST" or "GET" to indicate the type of response we want
     * @param   url         The URL to send the request to
     * @param   success     A function to run if the call succeeds
     * @param   error       A function to run if the request errors out
     * @param   params      An object with key value pairs
     *
     * @returns The request that was sent
     * ...........................................................................
    */
    function ajaxRequest(type: AjaxTypeEnum, url: string, successCb?: IAjaxSuccessFunction, errorCb?: IAjaxErrorFunction, params?: IAjaxParams | FormData): XMLHttpRequest;
    /**...........................................................................
     * loadFile
     * ...........................................................................
     * load a file from a particular URL
     *
     * @param   url         The URL to load a file from
     * @param   success     What to do when the file is loaded successfully
     * @param   error       What do do if the file can't be loaded
     * ...........................................................................
     */
    function loadFile(url: string, success?: IAjaxSuccessFunction, error?: IAjaxErrorFunction): void;
}
declare namespace KIP {
    /**...........................................................................
     * piece
     * ...........................................................................
     * Gets a piece of a delimited string
     *
     * @param 	str 		The string to grab a piece from
     * @param 	delim 	The character (or characters) that are delimiting the string
     * @param 	piece 	The piece number to get. Defaults to 1 if not passed in.
     *
     * @return The specified piece of the string, "" if it doesn't exist
     * ...........................................................................
     */
    function piece(str: string, delim: string, pc?: number): string;
    /**...........................................................................
     * titleCase
     * ...........................................................................
     * Capitalizes the first letter of each word of a given string, and converts all else to lowercase
     *
     * @param 	str   	The string to convert to title case
     * @param 	delim 	What separates the different words in this string
     *
     * @returns The string, now in title case
     * ...........................................................................
     */
    function titleCase(str: string, delim?: string): string;
    /**...........................................................................
     * sentenceCase
     * ...........................................................................
     * Capitalizes the first letter of a given string, and converts the rest to lowercase
     *
     * @param 	str   The string to capitalize
     *
     * @returns The string, now in sentence case
     * ...........................................................................
     */
    function sentenceCase(str: any): string;
    /**...........................................................................
     * charAt
     * ...........................................................................
     * Slightly more memorable way to get a character at a given position in a string
     *
     * @param 	str 	The string to take the character out of
     * @param 	idx 	What index of the string to get the character of
     *
     * @return The character at the specified position
     * ...........................................................................
     */
    function charAt(str: string, idx: number): string;
    /**...........................................................................
     * rest
     * ...........................................................................
     * Gets the substring of a string starting from a given index
     *
     * @param 	str 	The string to get the substring of
     * @param 	idx 	What index to start the substring at
     *
     * @return The rest of the string after the provided index
     * ...........................................................................
     */
    function rest(str: string, idx: number): string;
    /**...........................................................................
     * trim
     * ...........................................................................
     * Trims all white space off of the beginning and end of a string
     *
     * @param 	str 	The string to trim
     *
     * @return The trimmed string
     * ...........................................................................
     */
    function trim(str: string): string;
    /**...........................................................................
     * format
     * ...........................................................................
     * Take a string with placeholders and replaces them with the provided
     * parameters
     *
     * @param 	str 					The string to make replacements within
     * @param		replacements	The strings that should replace the placeholders
     *
     * @returns	The string with replacements made
     * ...........................................................................
     */
    function format(str: string, ...replacements: any[]): string;
    function isNumeric(str: string): boolean;
    /**...........................................................................
     * addLeadingZeros
     * ...........................................................................
     * Adds a number of leading zeroes before a number
     *
     * @param   count   The number of zeroes to add
     * @param   nums    The numbers to add zeroes to
     *
     * @returns All zero-padded numbers that were passed in
     * ...........................................................................
     */
    function addLeadingZeroes(count: number, unpadded: number | string): string;
}
declare namespace KIP {
    /**...........................................................................
     * INamedClass
     * ...........................................................................
     * Interface to allow for access into any named class
     * ...........................................................................
     */
    interface INamedClass {
        className: string;
    }
    /**...........................................................................
     * NamedClass
     * ...........................................................................
     * A class that contains a set of names that apply to this class. Used for
     * easier typing.
     *
     * @version 1.0
     * ...........................................................................
     */
    abstract class NamedClass implements INamedClass {
        /** keep track of all layers of the class name */
        private _class_names;
        readonly className: string;
        readonly paddedClassName: string;
        /**...........................................................................
         * Creates a named class
         *
         * @param	classNames		The initial class name to assign
         * ...........................................................................
         */
        constructor(...classNames: string[]);
        /**...........................................................................
         * _addClassName
         * ...........................................................................
         * Adds a new layer to our class name
         *
         * @param	class_name		The new class name to add
         *
         * @returns	True if we added the class name
         * ...........................................................................
         */
        protected _addClassName(class_name: string): boolean;
    }
}
declare namespace KIP.Styles {
    /**...........................................................................
     * IStandardStyles
     * ...........................................................................
     * Keep track of a style definition
     * ...........................................................................
     */
    interface IStandardStyles {
        [selector: string]: TypedClassDefinition;
    }
    /**...........................................................................
     * IPlaceholderMatchFunction
     * ...........................................................................
     *
     * ...........................................................................
     */
    interface IPlaceholderMatchFunction {
        (valuePiece: string): number | string;
    }
    /**...........................................................................
     * TypeClassDefinition
     * ...........................................................................
     * Allow TS users to create a new class
     * ...........................................................................
     */
    interface TypedClassDefinition extends IMappedType<CSSStyleDeclaration> {
        WebkitAppearance?: string;
        appearance?: string;
        nested?: IStandardStyles;
        from?: TypedClassDefinition;
        to?: TypedClassDefinition;
        objectFit?: string;
    }
    /**...........................................................................
     * IThemeColors
     * ...........................................................................
     * Keeps track of the appropriate theme colors
     * ...........................................................................
     */
    interface IThemeColors {
        [id: string]: string;
    }
    /**...........................................................................
     * @class Stylable
     * Creates an element that can additionally add CSS styles
     * @version 1.0
     * ...........................................................................
     */
    abstract class Stylable extends NamedClass {
        /** create the collection of all styles that have been added to the page */
        private static _pageStyles;
        /** keep track of all of the classes without the color substitutions */
        private static _uncoloredPageStyles;
        /** keep track of all of the theme colors for each of the classes */
        private static _themeColors;
        /** hold the style tag containing our css class */
        private static _styleElem;
        /** keep track of the styles we've already created */
        private static _createdStyles;
        /** keep track of the styles defined by this class */
        private _styles;
        /** keep track of the un-themed version of our styles */
        protected static _uncoloredStyles: IStandardStyles;
        private readonly _uncoloredStyles;
        readonly uncoloredStyles: IStandardStyles;
        /** overridable function to grab the appropriate styles for this particular class */
        protected _getUncoloredStyles(): IStandardStyles;
        /** keep track of the initial set of colors */
        protected _colors: string[];
        /** keep track of whether we've initialized our styles */
        protected _hasCreatedStyles: boolean;
        /**...........................................................................
         * Creates a stylable class
         * ...........................................................................
         */
        constructor();
        /**...........................................................................
         * setThemeColor
         * ...........................................................................
         * Update a theme color based on placeholders
         *
         * @param   idx             The index of the theme color
         * @param   color           The color to replace it with
         * @param   noReplace       True if we shouldn't replace an existing color
         * ...........................................................................
         */
        setThemeColor(idx: number, color: string, noReplace?: boolean): void;
        /**...........................................................................
         * _buildThemeColorId
         * ...........................................................................
         * Create a unique ID for a color for a particular class
         *
         * @param   idx         The index of the color
         * @param   uniqueID    Optional name to use instead of the class name
         *
         * @returns The created color ID
         * ...........................................................................
         */
        protected static _buildThemeColorId(idx: number, uniqueId: string): string;
        /**...........................................................................
         * _buildThemeColorId
         * ...........................................................................
         * Create a unique ID for a color for a particular class
         *
         * @param   idx         The index of the color
         * @param   uniqueID    Optional name to use instead of the class name
         *
         * @returns The created color ID
         * ...........................................................................
         */
        protected _buildThemeColorId(idx: number, uniqueId?: string): string;
        /**...........................................................................
         * _mergeThemes
         * ...........................................................................
         * Mere a set of themes into a single theme
         *
         * @param   styles  Sets of themes that should be merged together
         *
         * @returns The updated set of themes
         * ...........................................................................
         */
        protected static _mergeThemes(...styles: IStandardStyles[]): IStandardStyles;
        private static _combineThemes(...themes);
        /**...........................................................................
         * _mergeThemes
         * ...........................................................................
         * Instance class to merge different themes
         *
         * @param   themes  The themes to merge
         *
         * @returns The merged themes
         * ...........................................................................
         */
        protected _mergeThemes(...themes: IStandardStyles[]): IStandardStyles;
        /**...........................................................................
         * _mergeIntoStyles
         * ...........................................................................
         * Add a new set of styles into the set of page styles
         *
         * @param   styles  The styles to merge
         * ...........................................................................
         */
        protected static _mergeIntoStyles(styles: IStandardStyles): void;
        /**...........................................................................
         * _updateAllThemeColors
         * ...........................................................................
         * Make sure we have an updated version of our styles
         * ...........................................................................
         */
        protected static _updateAllThemeColors(): void;
        /**...........................................................................
         * _handleUpdatingThemeColor
         * ...........................................................................
         * Make sure any changes to theme colors are handled elegantly
         *
         * @param   styles  The styles to update
         *
         * @returns True if an update was made
         * ...........................................................................
         */
        protected static _handleUpdatingThemeColor(styles: IStandardStyles, updatedPlaceholder?: string): boolean;
        /**...........................................................................
         * _createStyles
         * ...........................................................................
         * Create the styles for this class
         * @param   forceOverride   True if we should create the classes even if they
         *                          already exist
         * ...........................................................................
         */
        protected static _createStyles(forceOverride?: boolean): void;
        /**...........................................................................
         * _createStyles
         * ...........................................................................
         * Create the styles for this class
         * @param   forceOverride   True if we should create the classes even if they
         *                          already exist
         * ...........................................................................
         */
        protected _createStyles(forceOverride?: boolean): void;
        /**...........................................................................
         * _cleanStyles
         * ...........................................................................
         * Clean the nested styles data so that we can parse it properly
         * @param   styles  The styles to clean
         * @returns The cleaned styles
         * ...........................................................................
         */
        protected _cleanStyles(styles: IStandardStyles, lastSelector?: string): IStandardStyles;
        protected static _cleanStyles(styles: IStandardStyles, lastSelector?: string): IStandardStyles;
        /**...........................................................................
         * _cleanClassDef
         * ...........................................................................
         * Clean a particular class definition recursively
         * @param   selector    The CSS selector for this class
         * @param   classDef    The definition for this CSS class
         * @returns The merged styles
         * ...........................................................................
         */
        protected static _cleanClassDef(selector: string, classDef: TypedClassDefinition): IStandardStyles;
        /**...........................................................................
         * _matchesNumericPlaceholder
         * ...........................................................................
         * Checks if a particular string is a placeholder for a theme color
         * @param   valuePiece  The value to check for any placeholder
         * @returns The placeholder ID
         * ...........................................................................
         */
        protected static _matchesPlaceholder(valuePiece: string): string;
        /**...........................................................................
         * _applyColors
         * ...........................................................................
         * Apply the appropriate theme colors
         * @param   otherElem   If passed in, sets a theme color on a different element
         * ...........................................................................
         */
        protected _applyColors(otherElem?: Stylable): void;
    }
    /**...........................................................................
     * createClass
     * ...........................................................................
     * Create a CSS class from a selector & set of attributes
     * @param   selector        The CSS selector we should use for this class
     * @param   attr            Attributes that should be
     * @param   noAppend        If true, doesn't add the style class to the document
     * @param   forceOverride   If true, replaces the class even if it already exists
     * @returns The created style element
     * ...........................................................................
     */
    function createClass(selector: string, attr: TypedClassDefinition, noAppend?: boolean, forceOverride?: boolean): HTMLStyleElement;
    /**...........................................................................
     * getPropertyName
     * ...........................................................................
     * grab the appropriate property name for the CSS class
     * @param   jsFriendlyName      The JS version of a CSS property name, usually in camel-case
     * @returns The CSS version of the property name
     * ...........................................................................
     */
    function getPropertyName(jsFriendlyName: string): string;
    /**...........................................................................
     * buildClassString
     * ...........................................................................
     * return the appropriate class
     *
     * @param   classes     List of all classes that should be combined into a
     *                      single class name
     *
     * @returns The full class name
     * ...........................................................................
     */
    function buildClassString(...classes: string[]): string;
}
declare namespace KIP {
    /**
     * @file Functions that allow for easier creation of SVG elements
     * @author Kip Price
     * @version 1.0
     * @since 1.1
     */
    /**
     * Creates an SVG parent that can be added to dynamically
     *
     * @param {String} id      The ID for the SVG element created
     * @param {Number} width   The width at which the SVG should display {optional: 0}
     * @param {Number} height  The height at which the SVG should display {optional: 0}
     * @param {String} view    The viewBox parameter that should be set for the created element {optional: "0 0 0 0"}
     * @param {String} content The contents of the SVG that should displayed {optional: ""}
     *
     * @returns {SVGElement} The SVG element that was created
     */
    function createSVG(id: string, width?: number, height?: number, view?: string, content?: string, aspect?: string): SVGElement;
    /**
     * Creates a piece of an SVG drawing
     *
     * @param {String} type - What type of SVG element we are drawing
     * @param {Object} attr - An object of key-value pairs of attributes to set for this element
     *
     * @returns {SVGElement} The element to be added to the SVG drawing
     */
    function createSVGElem(type?: string, attr?: any): SVGElement;
}
declare namespace KIP {
    /**
     * Creates a table with a specified set of cell elements
     * @param {string} tableID - The unique identifier to use for this table
     * @param {string} [tableClass] - The CSS class to use for the table
     * @param {array} elements - A 2D array of the indexing method [row][column] that contains the contents of the cell at this position that should be created within the table.
     *                         - Can come in three forms: a string of plain content, an already created element, or an object array with the following properties
     * @param {object} [elements[r][c].create] - An object to be passed into CreateElement, to generate the content of the cell
     * @param {string} [elements[r][c].content] - A string to be used as the content of the cell
     * @param {object} [elements[r][c].attr] - All additional attributes that should be applied to the cell (colspan & rowspan, e.g.)
     *
     * @returns {HTMLElement} The created HTML table
     *
     * */
    function createTable(tableID?: string, tableClass?: string, elements?: any[], rowNum?: number, colNum?: number): HTMLTableElement;
    /**
     * Processes data that can be used to populate a table cell
     * @param  {any}                  data The data to populate the cell with
     * @param  {HTMLTableCellElement} cell The cell to populate
     * @return {HTMLTableCellElement}      The cell, newly populated with contents
     */
    function processCellContents(data: any, cell: HTMLTableCellElement): HTMLTableCellElement;
    /**
     * Adds a row to an HTML table element
     * @param  {HTMLTableElement} table      The table element to add to
     * @param  {any[]}            [elements] Any elements that should be inccluded as cells in this row
     * @param  {number}           [idx]      The index at which this row should be added
     * @param  {number}           [colNum]   The number of columns that should be added to this row
     * @return {HTMLTableRowElement}       The row that was created
     */
    function addRow(table: HTMLTableElement, elements?: any[], idx?: number, colNum?: number): HTMLTableRowElement;
}
declare namespace KIP {
    type ITemplate = any;
    enum TemplateTypeEnum {
        FILE = 0,
        TEXT = 1,
    }
    interface ITemplateBase<T> {
        type: TemplateTypeEnum;
        id: string;
        content?: string;
        name?: string;
    }
    interface ITemplateObj<T> {
        structure: any[];
        html: HTMLElement[];
        elems: T;
        suffix: number;
    }
    /**
     * Create a templated HTML object
     * @param {object} inObj - All details needed to create the template
     * @param {string} inObj.type - Determines how the contents are loaded. Can be "file" or "text".
     * @param {string} inObj.id - The identifier to save for the template
     * @param {string} [inObj.content] - Contains free-text string for inOBjs of type "text"
     * @param {string} [inObj.name] - Contains the name of the file to load for inObjs of type "file"
     **/
    function createTemplate<T>(inObj: ITemplateBase<T>): boolean;
    /**
     * Loads a template with the specified data
     * @param {string} id - The identifier of the template to load
     * @param {object} content - An object containing any additional data to load into the template.
     * @param {boolean} [excludeBlank] - If true, any element with an ID in the template that is not populated by 'content' will be removed
     * @param {string} [suffix] - If provided, the suffix added to element IDs to differentiate this iteration of the template. Defaults to the
     *														count of iterations of the template.
     * @param {string} [delim] - If provided, the delimiter between the ID and the delimiter. Defaults to "|".
     * @returns {array} Array of top-level HTML elements in the template
     **/
    function loadTemplate<T>(id: string, content: T, excludeBlank?: boolean, suffix?: number, delim?: string): any;
}
declare namespace KIP {
    interface ITransitionStyle extends Styles.TypedClassDefinition {
        shouldRemove?: boolean;
    }
    /**...........................................................................
     * transition
     * ...........................................................................
     * Transition an element to a particular style, then alert the caller that
     * it has completed
     *
     * @param   element     The element to transition
     * @param   startStyle  If needed, any specific new attributes that are needed for this object
     * @param   endStyle    The style we should end up with
     * @param   time        How long this transition should take
     * @param   delay       How long this transition should be delayed
     *
     * @returns Promise that will be called after transition completes
     * ...........................................................................
     */
    function transition(element: HTMLElement, startStyle: ITransitionStyle, endStyle: ITransitionStyle, time: number, delay?: number): KipPromise;
}
declare namespace KIP {
    /**--------------------------------------------------------------------------
     * @interface IPoint
     * Defines a basic point in space
     * --------------------------------------------------------------------------
     */
    interface IPoint {
        x: number;
        y: number;
        z?: number;
    }
    /**--------------------------------------------------------------------------
     * @interface IBasicRect
     * Defines basic parameters for a rectangle
     * --------------------------------------------------------------------------
     */
    interface IBasicRect {
        x: number;
        y: number;
        w: number;
        h: number;
    }
    /**...........................................................................
     * @type IExtrema
     * ...........................................................................
     * Interface that stores a max point and a min point
     * ...........................................................................
     */
    type IExtrema = IGenericExtrema<IPoint>;
    /**...........................................................................
     * @class IGenericExtrema
     * ...........................................................................
     * Handle any type of extreema
     * ...........................................................................
     */
    interface IGenericExtrema<T> {
        max: T;
        min: T;
    }
    /**--------------------------------------------------------------------------
     * @interface IVector
     * Keeps track of a vector definition
     * --------------------------------------------------------------------------
     */
    interface IVector {
        startPoint: IPoint;
        endPoint: IPoint;
        distance: number;
        angleInDegrees: number;
    }
    namespace Trig {
        /**--------------------------------------------------------------------------
         * debugPoint
         * --------------------------------------------------------------------------
         * Print the coordinates contained in a point
         *
         * @param point 	the point to print for debugging
         * --------------------------------------------------------------------------
         */
        function debugPoint(point: IPoint): void;
        /**--------------------------------------------------------------------------
         * degressToRadians
         * --------------------------------------------------------------------------
         * Convert degrees measure to the equivalent radians measure
         *
         * @param 	deg 	The degree value to convert
         *
         * @returns The approproate angle in radians
         * --------------------------------------------------------------------------
         */
        function degreesToRadians(deg: number): number;
        /**--------------------------------------------------------------------------
         * getEndPoint
         * --------------------------------------------------------------------------
         * Calculate where a particular vector will end, given the start point, distance, and angle
         *
         * @param 	startPoint 	where the vector originates
         * @param 	deg 		the degree of angle
         * @param 	distance	how far the vector should extend
         * --------------------------------------------------------------------------
         */
        function getEndPoint(startPoint: IPoint, deg: number, distance: number): IPoint;
        function getCentralPoint(elem: HTMLElement): IPoint;
        /**--------------------------------------------------------------------------
         * arrangeRadially
         * --------------------------------------------------------------------------
         * Arrange a series of elements around a central element, making sure there is enough room for each element
         *
         * @param 	centralELem 	the element to use as the center point
         * @param 	fringeElems 	the elements to arrange around the central element
         * @param 	minAngle 		the angle at which to start (in degrees)
         * @param 	maxAngle 		the angle at which to stop (in degrees)
         * --------------------------------------------------------------------------
         */
        function arrangeRadially(centralELem: HTMLElement, fringeElems: HTMLElement[], minAngle?: number, maxAngle?: number): void;
        /**--------------------------------------------------------------------------
         * drawLine
         * --------------------------------------------------------------------------
         * Draws a line between two points
         *
         * @param 	start       	The start point of the line
         * @param 	end         	The end point of the line
         * @param 	host        	The element to draw the line on
         * @param 	lbl       		If included, what to label the line
         * @param 	lblNoRotate 	If true, doesn't rotate the text to match the line angle
         *
         * @returns The line that was drawn
         * --------------------------------------------------------------------------
         */
        function drawLine(start: IPoint, end: IPoint, host: HTMLElement, lbl?: string, lblNoRotate?: boolean): HTMLElement;
        /**--------------------------------------------------------------------------
         * connectElements
         * --------------------------------------------------------------------------
         * Draws a line between the two provided elements
         *
         * @param 	start_elem 	The element to start the line at
         * @param 	end_elem   	The element to end the line at
         *
         * @return 	The line that gets drawn
         * --------------------------------------------------------------------------
         */
        function connectElements(start_elem: HTMLElement, end_elem: HTMLElement, lbl?: string, lblNoRotate?: boolean): HTMLElement;
        /**--------------------------------------------------------------------------
         * clientRectToShape
         * --------------------------------------------------------------------------
         * Converts a Client Rect to a basic shape
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The array of points that make up this shape
         * --------------------------------------------------------------------------
         */
        function clientRectToShape(rect: ClientRect): IPoint[];
        /**--------------------------------------------------------------------------
         * svgRectToShape
         * --------------------------------------------------------------------------
         * Converts a SVG Rect to a basic shape
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The array of points that make up this shape
         * --------------------------------------------------------------------------
         */
        function svgRectToShape(rect: SVGRect): IPoint[];
        /**--------------------------------------------------------------------------
         * svgRectToBasicRect
         * --------------------------------------------------------------------------
         * Convert a SVG rectangle to a basic rectangle
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The resulting IBasicRect representation of the passed in rect
         * --------------------------------------------------------------------------
         */
        function svgRectToBasicRect(rect: SVGRect): IBasicRect;
        /**--------------------------------------------------------------------------
         * clientRectToBasicRect
         * --------------------------------------------------------------------------
         * Convert a client rectangle to a basic rectangle
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The resulting IBasicRect representation of the passed in rect
         * --------------------------------------------------------------------------
         */
        function clientRectToBasicRect(rect: ClientRect): IBasicRect;
        /**--------------------------------------------------------------------------
         * toBasicRect
         * --------------------------------------------------------------------------
         * Converts any supported rectangle to a basic rectangle
         *
         * @param 	rect 	The rectangle to convert
         *
         * @returns The basic rect version of this client / svg rect
         * --------------------------------------------------------------------------
         */
        function toBasicRect(rect: IBasicRect | ClientRect | SVGRect): IBasicRect;
        /**--------------------------------------------------------------------------
         * getAngle
         * --------------------------------------------------------------------------
         * Finds the angle between two points
         *
         * @param {Object} start - The origin point of an angle
         * @param {Number} start.x - The x position of the origin point
         * @param {Number} start.y - The y position of the origin point
         * @param {Object} end - The destination point of an angle
         * @param {Number} end.x - The x position of the end point
         * @param {Number} end.y - The y position of the end point
         *
         * @return {Number} The angle (in degrees) between the two points
         * --------------------------------------------------------------------------
         */
        function getAngle(start: IPoint, end: IPoint): number;
        /**--------------------------------------------------------------------------
         * getDistance
         * --------------------------------------------------------------------------
         * Finds the distance between the two provided points
         *
         * @param 	start 	The first endpoint of the segment we are measuring
         * @param 	end 	The second enpoint of the segment we are measuring
         *
         * @return The distance between the two points
         * --------------------------------------------------------------------------
         */
        function getDistance(start: IPoint, end: IPoint): number;
        /**--------------------------------------------------------------------------
         * calculatePolygonInternalAngle
         * --------------------------------------------------------------------------
         * calculate the internal angle for a given polygon
         *
         * @param 	numberOfSides 	The number of sides that the polygon has
         *
         * @returns the internal angle for this polygon, in radians
         * --------------------------------------------------------------------------
         */
        function calculatePolygonInternalAngle(numberOfSides: number): number;
        /**--------------------------------------------------------------------------
         * isWithin
         * --------------------------------------------------------------------------
         * Checks whether a value is within a max/min range
         *
         * @param 	val           	The value to check for inclusion
         * @param 	min           	The max value
         * @param 	max           	The min value
         * @param 	non_inclusive 	True if we shouldn't include the end points
         *
         * @returns True if the value is contained in the range
         * --------------------------------------------------------------------------
         */
        function isWithin(val: number, min: number, max: number, non_inclusive?: boolean): boolean;
        /**-------------------------------------------------------------------------
         * isPointContained
         * --------------------------------------------------------------------------
         * Determines whether a point is contained within a particular rectangle
         *
         * @param 	pt 		The point to check for containment
         * @param 	rect 	The rectangle to check
         *
         * @returns True if the point is contained in the rectangle
         ----------------------------------------------------------------------------*/
        function isPointContained(pt: IPoint, rect: ClientRect | SVGRect | IBasicRect): boolean;
        /**----------------------------------------------------------------------------
         * isRectContained
         * ----------------------------------------------------------------------------
         * Checks whether a client rect is entirely contained within another
         *
         * @param 	rect      	The element to check for containement
         * @param 	container 	The element to check if the rect is contained within
         *
         * @returns True if rect is completely contained by container
         ------------------------------------------------------------------------------*/
        function isRectContained(rect: IBasicRect | ClientRect | SVGRect, container: IBasicRect | ClientRect | SVGRect): boolean;
        /**-----------------------------------------------------------------------------
         * isElementContained
         *------------------------------------------------------------------------------
         * Checks if an element is completely contained by another element
         *
         * @param 	elem      	The element to check for containment
         * @param 	container 	The element to check if it contains the other elem
         *
         * @returns True if the element is completely contained
         -------------------------------------------------------------------------------
         */
        function isElementContained(elem: HTMLElement, container: HTMLElement): boolean;
        /**--------------------------------------------------------------------------
         * isShapeContained
         * --------------------------------------------------------------------------
         * Checks if a given shape is contained within a given bounding box
         *
         * @param 	shape 	The collection of points to check
         * @param 	bounds 	The bounding box to be within
         *
         * @returns True if the shape is completely contained in the bounding box
         * --------------------------------------------------------------------------
         */
        function isShapeContained(shape: IPoint[], bounds: ClientRect | SVGRect): boolean;
        /**--------------------------------------------------------------------------
         * doElementsOverlap
         * --------------------------------------------------------------------------
         * Checks if two given elements overlap
         *
         * @param 	elem1 	The first element to check
         * @param 	elem2 	The second element to check
         *
         * @returns True if the elements overlap, false otherwise
         * --------------------------------------------------------------------------
         */
        function doElementsOverlap(elem1: HTMLElement, elem2: HTMLElement): boolean;
        /**--------------------------------------------------------------------------
         * doRectsOverlap
         * --------------------------------------------------------------------------
         * Checks if two rectangles overlap at all
         *
         * @param 	rect1 	The first rectangle to check
         * @param 	rect2 	The second rectangle to check
         *
         * @returns True if there is any overlap between the rectangles
         * --------------------------------------------------------------------------
         */
        function doRectsOverlap(rect1: IBasicRect | ClientRect | SVGRect, rect2: IBasicRect | ClientRect | SVGRect): boolean;
        /**--------------------------------------------------------------------------
         * doBasicRectsOverlap
         * --------------------------------------------------------------------------
         * detect if two rectangles overlap
         *
         * @param 	rect1	the first rectangle to compare
         * @param 	rect2	the second rectangle to compare
         *
         * @returns true if the two rectangles do overlap
         * --------------------------------------------------------------------------
         */
        function doBasicRectsOverlap(rect1: IBasicRect, rect2: IBasicRect): boolean;
        /**--------------------------------------------------------------------------
         * findBasicRectIntersection
         * --------------------------------------------------------------------------
         * calculate the overlap section for 2 given basic rectangles
         *
         * @param rect1 - the first rectangle to check
         * @param rect2 - the second rectangle to check
         *
         * @returns The rectangle of overlap
         * --------------------------------------------------------------------------
         */
        function findBasicRectIntersection(rect1: IBasicRect, rect2: IBasicRect): IBasicRect;
    }
}
declare namespace KIP {
    /** check if the element is an HTML element */
    function isHTMLElement(test: any): test is HTMLElement;
    /** Check if the element is a string */
    function isString(test: any): test is string;
    /** check if the element is a number */
    function isNumber(test: any): test is number;
    /** check if the element is a boolean */
    function isBoolean(test: any): test is boolean;
    /** check if the element is a client rectangle */
    function isClientRect(test: any): test is ClientRect;
    /** check if the element is a SVG rectangle */
    function isSVGRect(test: any): test is SVGRect;
    /** check if the element is a basic rectangle */
    function isIBasicRect(test: any): test is IBasicRect;
    function isIPoint(test: any): test is IPoint;
    /** check if the element is an element definition implementation */
    function isIElemDefinition(test: any): test is IElemDefinition;
    /** check if the element is an IExtrema implementation */
    function isIExtrema(test?: any): test is IExtrema;
    /** generic function to check if a given object implements a particular interface */
    function isInterface<T extends Object>(test: any, full_imp: T): test is T;
    /** check if the element implements the Editable class */
    function isEditable<T>(test: any): test is Editable<T>;
    /** check if the element implements the drawable class */
    function isDrawable(test: any): test is Drawable;
    /** check if the element is one that can be used as a drawable base */
    function isDrawableElement(test: any): test is DrawableElement;
    /** generic function to check if an element has a particular class name in its inheritance tree */
    function isNamedClass<T extends NamedClass>(test: any, name: string): test is T;
    /**
     * isUpdatable
     *
     * Determine if this object has an update method
     * @param test
     */
    function isUpdatable(test: any): test is IUpdatable;
}
declare namespace KIP {
    function generateUniqueID(prefix?: string): string;
}
declare namespace KIP {
    /**...........................................................................
     * IComparable
     * ...........................................................................
     * Interface for objects that can be compared to like objects
     * ...........................................................................
     */
    interface IComparable<T> extends IEquatable<T> {
        /**...........................................................................
         * lessThan
         * ...........................................................................
         * Determines if this element is lesser than the other passed in
         *
         * @param	other	The element to compare to
         *
         * @returns	True if this object should be considered lesser
         * ...........................................................................
         */
        lessThan(other: T): boolean;
        /**...........................................................................
         * greaterThan
         * ...........................................................................
         * Determines if this element is greater than the other passed in
         *
         * @param	other	The element to compare to
         *
         * @returns	True if this object should be considered greater
         * ...........................................................................
         */
        greaterThan(other: T): boolean;
    }
    /**...........................................................................
     * IEquatable
     * ...........................................................................
     * Interface for objects that can be equal to one another
     * ...........................................................................
     */
    interface IEquatable<T> {
        /**...........................................................................
         * equals
         * ...........................................................................
         * Determines whether this element is equal to the other passed in
         *
         * @param	other	The element to compare to
         *
         * @returns	True if the objects should be considered the same
         * ...........................................................................
         */
        equals(other: T): boolean;
    }
    /**...........................................................................
   * equals
   * ...........................................................................
   * Determines if two elements of the same type can be considered equal
   *
   * @param   orig        The first elem to examine
   * @param   comparison  The second elem to examine
   *
   * True if the two elements can be considered equal
   * ...........................................................................
   */
    function equals<T>(orig: T, comparison: T): boolean;
    /**...........................................................................
     * lesserThan
     * ...........................................................................
     * @param 	orig 		The element to check for being less than the other
     * @param 	comparison 	The element to check for being greater than the other
     *
     * @returns True if the first element is lesser than the second
     * ...........................................................................
     */
    function lesserThan<T>(orig: T, comparison: T): boolean;
    /**...........................................................................
     * greatherThan
     * ...........................................................................
     * @param 	orig 		The element to check for being greater than the other
     * @param 	comparison 	The element to check for being lesser than the other
     *
     * @returns True if the first element is greater than the second
     * ...........................................................................
     */
    function greaterThan<T>(orig: T, comparison: T): boolean;
}
declare namespace KIP {
    interface ISet<T> {
        [key: string]: T;
    }
}
declare namespace KIP {
    interface IUpdatable {
        update(...args: any[]): void;
    }
}
declare namespace KIP {
    abstract class Model<T> {
        /**...........................................................................
         * _copyData
         * ...........................................................................
         * Copies data from a JSON version of this model
         *
         * @param   data    The data to save into our model
         * ...........................................................................
         */
        protected _copyData<K extends keyof T>(data: T): void;
        protected _copyPiece<K extends keyof T>(key: K, value: T[K]): void;
        /**...........................................................................
         * saveData
         * ...........................................................................
         * Gets data out of this model in JSON format
         * ...........................................................................
         */
        saveData<K extends keyof T>(): T;
        protected _savePiece<K extends keyof T>(key: K, val: T[K]): T[K];
    }
    /**
     * @class   Serializable
     *
     * Creates a model that can be turned into a string
     * @version 1.0
     * @author  Kip Price
     */
    abstract class Serializable<T> extends Model<T> {
        /**...........................................................................
         * serialize
         * ...........................................................................
         * Turn this model into a savable JSON string
         * @returns The string version of this data
         * ...........................................................................
         */
        serialize(): string;
        /**...........................................................................
         * deserialize
         * ...........................................................................
         * Turns a string into a version of this model
         *
         * @param   data  The string to deserialize
         *
         * @returns True if we could deserialize
         * ...........................................................................
         */
        deserialize(data: string): boolean;
    }
}
declare namespace KIP {
    /**...........................................................................
     * CollectionTypeEnum
     * ...........................................................................
     * Keeps track of the different ways we can add to a collection
     * ...........................................................................
     */
    enum CollectionTypeEnum {
        ReplaceDuplicateKeys = 1,
        IgnoreDuplicateKeys = 2,
    }
    /**...........................................................................
     * CollectionSortFunction
     * ...........................................................................
     * Sort a collection, same as one would sort an array
     *
     * @param	a	The first element to compare
     * @param	b	The second element to compare
     *
     * @returns	-1 if the elements are in the wrong order, 1 if they are in the correct order, 0 if they are the same
     * ...........................................................................
     */
    interface CollectionSortFunction<T> {
        (a: ICollectionElement<T>, b: ICollectionElement<T>): number;
    }
    /**...........................................................................
     * SortFunction
     * ...........................................................................
     * General sort function for comparing two elements of any type
     *
     * @param	a	The first element to compare
     * @param	b	The second element to compare
     *
     * @returns	-1 if the elements are in the wrong order, 1 if they are in the correct order, 0 if they are the same
     * ...........................................................................
     */
    interface SortFunction<T> {
        (a: T, b: T): number;
    }
    /**...........................................................................
     * EqualityFunction
     * ...........................................................................
     * Check if two elements are equal
     * ...........................................................................
     */
    interface EqualityFunction<T> {
        (a: T, b: T): boolean;
    }
    /**...........................................................................
     * ICollectionElement
     * ...........................................................................
     * The class that stores data within a collection
     * ...........................................................................
     */
    interface ICollectionElement<T> {
        /** the key this element is stored under */
        key: string;
        /** the actual value for the element */
        value: T;
        /** where the element sits in the sorted index */
        sortedIdx: number;
        /** where the element was originally added */
        origIdx: number;
    }
    /**...........................................................................
     * IDisctionaryKeys
     * ...........................................................................
     * The array that provides the key index within a collection
     * ...........................................................................
     */
    interface IDictionaryKeys<T> {
        [key: string]: ICollectionElement<T>;
    }
    class Collection<T> extends NamedClass implements IEquatable<Collection<T>> {
        /** Tracks of the data in this collection */
        private _data;
        /** allow retrieval of a set of keys */
        readonly keys: string[];
        /** Stores the sorted array of keys for the collection */
        private _sortedData;
        /** Whether we should augment or replace in this collection  */
        private _addType;
        addType: CollectionTypeEnum;
        /** internal counter for the iteration we are currently on */
        private _iteration;
        readonly iteration: number;
        /** get the current number of elements in our collection */
        readonly length: number;
        /** what to use to check for two elements being equal */
        protected _equalityTest: EqualityFunction<T>;
        equalityTest: EqualityFunction<T>;
        /**...........................................................................
         * Creates the collection
         * @param  {boolean} replace True if we should override the values in the list
         * @return Collection
         * ...........................................................................
         */
        constructor(type?: CollectionTypeEnum, eq_test?: EqualityFunction<T>);
        /**...........................................................................
         * addElement
         * ...........................................................................
         * Adds an element to the collection
         * @param 	key  	The key to uniquely identify this element
         * @param 	val 	The element to add to our collection
         * @returns True if the element was successfully added
         * ...........................................................................
         */
        addElement(key: string, val: T): number;
        /**...........................................................................
         * insertElement
         * ...........................................................................
         * inserts an element at a particular index
         * ...........................................................................
         */
        insertElement(key: string, elem: T, index: number): boolean;
        /**...........................................................................
         * removeElement
         * ...........................................................................
         * remove the element with the provided key
         * ...........................................................................
         */
        removeElement(key: string): ICollectionElement<T>;
        /**...........................................................................
         * removeElement
         * ...........................................................................
         * remove the element at the provided index
         * ...........................................................................
         */
        removeElement(idx: number): ICollectionElement<T>;
        /**...........................................................................
         * removeElementByValue
         * ...........................................................................
         *  remove the element that matches the provided element
         * ...........................................................................
         */
        removeElementByValue(value: T): ICollectionElement<T>;
        /**...........................................................................
         * _removeElementByKey
         * ...........................................................................
         *  removes an element by key
         * ...........................................................................
         */
        protected _removeElementByKey(key: string): ICollectionElement<T>;
        /**...........................................................................
         * _removeElementByIndex
         * ...........................................................................
         * removes an element by index
         * ...........................................................................
         */
        protected _removeElementByIndex(idx: number): ICollectionElement<T>;
        /**...........................................................................
         * _removeElementByValue
         * ...........................................................................
         * removes an element by matching the element to the provided element
         * ...........................................................................
         */
        protected _removeElementByValue(val: T): ICollectionElement<T>;
        /**...........................................................................
         * _resetSortedKeys
         * ...........................................................................
         * Ensure that the key stored with the element matches its location in the
         * sorted array
         * ...........................................................................
         */
        private _resetSortedKeys(startFrom?, endWith?);
        clear(): void;
        /**...........................................................................
         * sort
         * ...........................................................................
         * Sorts the collection
         * @param 	sort_func   	The function we should use to sort
         * ...........................................................................
         */
        sort(sort_func: CollectionSortFunction<T>): void;
        /**...........................................................................
         * resetLoop
         * ...........................................................................
         * Resets our iteration counter
         *
         * @param	reverse		If true, loops through backwards
         * ...........................................................................
         */
        resetLoop(reverse?: boolean): void;
        /**...........................................................................
         * hasNext
         * ...........................................................................
         * Checks if we have a next element available for getting
         *
         * @param 	reverse 	True if we should loop backwards
         *
         * @returns True if there is a next element available
         * ...........................................................................
         */
        hasNext(reverse?: boolean): boolean;
        /**...........................................................................
         * getNext
         * ...........................................................................
         * Finds the next element in our loop
         *
         * @param 	reverse 	True if we should loop backwards
         *
         * @returns The element next in our array
         * ...........................................................................
         */
        getNext(reverse?: boolean): ICollectionElement<T>;
        getCurrent(): ICollectionElement<T>;
        /**...........................................................................
         * toArray
         * ...........................................................................
         * Return a sorted array of the elements in this collection
         * ...........................................................................
         */
        toArray(): Array<ICollectionElement<T>>;
        /**
         * toValueArray
         *
         * Get an array of just the values in this collection
         */
        toValueArray(): Array<T>;
        /**...........................................................................
         * getElement
         * ...........................................................................
         * @param key
         * ...........................................................................
         */
        getElement(key: string): ICollectionElement<T>;
        /**...........................................................................
         * getElement
         * ...........................................................................
         * @param idx
         * ...........................................................................
         */
        getElement(idx: number): ICollectionElement<T>;
        /**...........................................................................
         * getValue
         * ...........................................................................
         *
         * @param 	key		The key for which we should grab the value
         * ...........................................................................
         */
        getValue(key: string): T;
        /**...........................................................................
         * getValue
         * ...........................................................................
         *
         * @param 	idx 	The index for which we should grab the value
         * ...........................................................................
         */
        getValue(idx: number): T;
        /**...........................................................................
         * getIndex
         * ...........................................................................
         *
         * @param key
         * ...........................................................................
         */
        getIndex(key: string): number;
        /**...........................................................................
         * getIndex
         * ...........................................................................
         * @param val
         * ...........................................................................
         */
        getIndex(val: T): number;
        /**...........................................................................
         * _findElement
         * ...........................................................................
         *
         * @param val
         * ...........................................................................
         */
        private _findElement(val);
        getKey(idx: number): string;
        getKey(val: T): string;
        hasElement(key: string): boolean;
        hasElement(val: T): boolean;
        hasElement(idx: number): boolean;
        /**...........................................................................
         * map
         * ...........................................................................
         * handle looping through the collection to get each element
         * ...........................................................................
         */
        map(mapFunc: IMapFunction<T>): void;
        /**...........................................................................
         * toString
         * ...........................................................................
         * Turns this collection into a human readable string
         *
         * @returns	The string version of the collection
         * ...........................................................................
         */
        toString(): string;
        /**...........................................................................
         * equals
         * ...........................................................................
         * Determins if this Collection us equal in value to another
         *
         * @param	other	The collection to compare to
         *
         * @returns	True if the collection is a match for our own
         * ...........................................................................
         */
        equals(other: Collection<T>): boolean;
    }
}
declare namespace KIP.Colors {
    /**...........................................................................
     * Items for grabbing color conversions and new colors
     * @file color.ts
     * @version 1.0
     * @author Kip Price
     * ...........................................................................
     */
    /** The amount the hue should increase when cycling through new colors */
    const HUE_INTERVAL = 22;
    /** The amount that the lightness should increase when cycling through new colors */
    const LIGHT_INTERVAL = 20;
    /** The amount that the saturation should increase when cycling through new colors */
    const SATURATION_INTERVAL = 20;
    /** The max and min saturation value that should be used for cycling colors */
    const SATURATION_LIMITS: {
        max: number;
        min: number;
    };
    /** The max and min lightness values that should be used for cycling colors */
    const LIGHTNESS_LIMITS: {
        max: number;
        min: number;
    };
    enum HSLPieceEnum {
        HUE = 1,
        SATURATION = 2,
        LIGHTNESS = 3,
        ALPHA = 4,
    }
    enum RGBEnum {
        RED = 0,
        GREEN = 1,
        BLUE = 2,
        ALPHA = 3,
    }
    var colorGlobal: Color;
    interface IColorMultipliers {
        hue: number;
        saturation: number;
        lightness: number;
        alpha: number;
    }
    /**...........................................................................
     * generateColor
     * ...........................................................................
     * Generates the next color in the global color object
     *
     * @param 	id 				An identifier for the color
     * @param	firstRotate		Which HSL value should change first. Defaults to Hue
     *
     * @returns The next hex string for the color selector
     * ...........................................................................
     */
    function generateColor(id: string, firstRotate?: HSLPieceEnum): Color;
    /**...........................................................................
     * getCurrentColor
     * ...........................................................................
     * Finds the current color of the color object & returns it
     * ...........................................................................
     */
    function getCurrentColor(): string;
    /**...........................................................................
     * getApparentColor
     * ...........................................................................
     * Calculates the non-opacity value of the semi-transparent front color when placed over another color
     *
     * @param 	frontColor	A color string including an alpha value
     * @param 	backColor	The color that appears in the background
     * @param 	opacity		The opacity of the first color, if not included in the color string
     *
     * @returns	The created apparent color as a hex string
     * ...........................................................................
     */
    function getApparentColor(frontColor: string, backColor: string, opacity: number): string;
    /**...........................................................................
     * getComplementaryColor
     * ...........................................................................
     * Find a color that works well with the color passed in
     *
     * @param 	color		The color to find a complement for
     * @param 	cutoff 		How different the lightnesses of the colors need to be
     *
     * @returns	The color string for the appropriate complementary color
     * ...........................................................................
     */
    function getComplementaryColor(color: string, cutoff: number): string;
    /**...........................................................................
     * hexToRgb
     * ...........................................................................
     * Converts a hex color string to a RGB color string
     *
     * @param 	hex 	The hex string to convert
     *
     * @returns The appropriate RGB string
     * ...........................................................................
     */
    function hexToRgb(hex: string): string;
    /**...........................................................................
     * hexToRgba
     * ...........................................................................
     * Converts a hex color string to rgba color string
     *
     * @param 	hex 	The hex string to parse
     * @param 	alpha 	The alpha value to give the color
     *
     * @returns	The rgba version of this hex string
     * ...........................................................................
     */
    function hexToRgba(hex: string, alpha: number): string;
    /**...........................................................................
     * hslToRgb
     * ...........................................................................
     * Converts a HSL string to RGB string
     *
     * @param {string} hsl - The HSL string to parse
     *
     * @returns {string} The RGB string that corresponds
     * ...........................................................................
     */
    function hslToRgb(hsl: string): string;
    /**...........................................................................
     * hslaToRgba
     * ...........................................................................
     * Converts a HSLA string to a RGB string
     *
     * @param 	hsl 	The HSL string to convert
     * @param 	alpha 	The alpha value to use, if the hsl string doesn't include it
     *
     * @returns The appropriate RGBA string
     * ...........................................................................
     */
    function hslaToRgba(hsl: string, alpha: number): string;
    /**...........................................................................
     * fullHexString
     * ...........................................................................
     * Grabs the hex value for a given number and ensures it is a certain length
     *
     * @param 	val 	The number to convert to Hex
     * @param 	length 	How long the hex string should be
     *
     * @returns The hex value of the passed in number
     * ...........................................................................
     */
    function fullHexString(val: number, length: number): string;
    /**...........................................................................
     * @class Color
     * Handles conversion between color values
     * @version 1.1
     * ...........................................................................
     */
    abstract class Color extends NamedClass implements IEquatable<Color> {
        /** keep track of whether the color was parsed correctly */
        protected _parsedCorrectly: boolean;
        /** shared alpha property for the color */
        protected _alpha: number;
        alpha: number;
        /** red value of RGB */
        protected _red: number;
        red: number;
        /** green value of RGB */
        protected _green: number;
        green: number;
        /** blue value of RGB */
        protected _blue: number;
        blue: number;
        /** current hue of HSL color */
        protected _hue: number;
        hue: number;
        /** current saturation value of HSL color */
        protected _saturation: number;
        saturation: number;
        /** current lightness value of HSL color */
        protected _lightness: number;
        lightness: number;
        protected _startHue: number;
        protected _startSaturation: number;
        protected _startLightness: number;
        /**...........................................................................
        * Creates an object that can handle color conversions
        * @constructor
        * @param {number} [r] - The red value for the color
        * @param {number} [g] - The green value for the color
        * @param {number} [b] - The blue value for the color
        * @param {number} [a] - The alpha value for the color
        * ...........................................................................
        */
        constructor();
        /**...........................................................................
         * rgbaString
         * ...........................................................................
         * Gets the appropriate RGBA string for this color
         *
         * @returns {string} RGBA string for the color
         * ...........................................................................
         */
        rgbaString(): string;
        /**...........................................................................
         * rgbString
         * ...........................................................................
         * Grabs the RGB string (with A element if appropriate) for this color
         *
         * @param {boolean} withAlpha - If true, include the alpha element in the returned string
         *
         * @returns {string} The appropriate color string
         * ...........................................................................
         */
        rgbString(with_alpha?: boolean): string;
        /**...........................................................................
         * hslString
         * ...........................................................................
         * From the color object, creates a hue-saturation-lightness string
         *
         * @param 	withAlpha 	If true, also adds an alpha element to the end of the string
         *
         * @returns	The HSL string version of this color
         * ...........................................................................
         */
        hslString(with_alpha?: boolean): string;
        /**...........................................................................
         * hslaString
         * ...........................................................................
         * From the color object, create a HSLA string
         *
         * @returns A string for the color
         * ...........................................................................
         */
        hslaString(): string;
        /**...........................................................................
         * hexString
         * ...........................................................................
         * From the color object, creates a hex color string
         *
         * @param 	withAlpha	True if alpha should be added to the hex string
         *
         * @returns The appropriate hex string
         * ...........................................................................
         */
        hexString(with_alpha?: boolean): string;
        /**...........................................................................
         * generateHslValues
         * ...........................................................................
         * Calculates the HSL values for this RGB color and saves it off in the color.
         * Relies on the rgb values already having been set
         * ...........................................................................
         */
        generateHslValues(): void;
        /**...........................................................................
         * generateRgbValues
         * ...........................................................................
         * Saves off the appropriate RGB values for this color based on its hex values.
         * Relies on the hex colors being set
         * ...........................................................................
         */
        generateRgbValues(): void;
        /**...........................................................................
         * _parseFromHexColor
         * ...........................................................................
         * Takes in a hex string and saves it internally
         *
         * @param 	hex		The hex string to parse in
         * @param 	alpha 	The alpha value to use
         *
         * @returns True if the parsing succeeds, false otherwise
         * ...........................................................................
         */
        protected _parseFromHexColor(hex: string, alpha?: number): boolean;
        /**...........................................................................
         * _parseFromRgbColor
         * ...........................................................................
         * Takes in a rgb color string and parses it into our internal format
         *
         * @param 	rgb   	The RGB string to parse
         * @param 	alpha	The alpha value to parse in, if the rgb string doesn't have it
         *
         * @returns True if the parsing succeeds, false otherwise
         * ...........................................................................
         */
        protected _parseFromRgbColor(rgb: string, alpha?: number): boolean;
        /**...........................................................................
         * _parseFromHslColor
         * ...........................................................................
         * Takes in a HSL string and converts it to the color object's internal format
         *
         * @param 	hsl 	The HSL string to convert. Can also be a HSLA string
         * @param 	alpha 	The alpha value to set, if it is not included in the HSLA string
         *
         * @returns True if the color was successfully parsed, false otherwise.
         * ...........................................................................
         */
        protected _parseFromHslColor(hsl: string, alpha?: number): boolean;
        /**...........................................................................
         * _parseColorString
         * ...........................................................................
         * Tries to parse a given string into an internal color object
         *
         * @param 	str 	The string to parse
         * @param 	alpha 	The alpha value to use, if not included in the string
         *
         * @returns True if the parsing succeeds, false otherwise
         * ...........................................................................
         */
        protected _parseColorString(str: string, alpha?: number): boolean;
        /**...........................................................................
         * updateRgbValue
         * ...........................................................................
         * Sets a color value based on the index of the color (ie, red = 0, green = 1)
         *
         * @param 	idx 	The index of the color we are saving
         * @param 	val 	The value that the color should be set to
         * ...........................................................................
         */
        updateRgbValue(valueType: RGBEnum, val: number): void;
        /**...........................................................................
         * updateHslValue
         * ...........................................................................
         * Sets a color value based on the index of the color (ie, hue = 1, saturation = 2...)
         *
         * @param 	idx 	The index of the color we are saving
         * @param 	val 	The value that the color should be set to
         * ...........................................................................
         */
        updateHslValue(valueType: HSLPieceEnum, val: number): void;
        /**...........................................................................
         * getNextHue
         * ...........................................................................
         * Grabs the next hue available for this color selector.
         * Can be used as a random color generator
         *
         * @param	firstRotate		The HSL pice that should be rotating first
         * @param 	withAlpha 		True if the alpha value should also be included in the output string
         *
         * @returns The hex color string for the new color
         * ...........................................................................
         */
        getNextColor(firstRotate: HSLPieceEnum, withAlpha?: boolean): string;
        /**...........................................................................
         * getCurrentHue
         * ...........................................................................
         * Grabs the current string for the color
         *
         * @param	withAlpha	True if the string should include the alpha value
         *
         * @returns The appropriate string for the color
         * ...........................................................................
         */
        abstract getCurrentColor(withAlpha?: boolean): string;
        /**...........................................................................
         * rotateAppropriateHSLValue
         * ...........................................................................
         * Calculates the next appropriate value for the HSL type, and
         *
         * @param 	idx		The type of HSL values we should rotate
         *
         * @returns	True if a full circle has been made for this particular index;
         * 			False otherwise
         * ...........................................................................
         */
        rotateAppropriateHSLValue(idx: HSLPieceEnum): boolean;
        /**...........................................................................
         * rotateHue
         * ...........................................................................
         * Rotates our current hue value a set amount
         *
         * @returns The new hue value for the color
         * ...........................................................................
         */
        rotateHue(): number;
        /**...........................................................................
         * rotateSaturation
         * ...........................................................................
         * Get the next saturation value for this color
         *
         * @returns	The next saturation value
         * ...........................................................................
         */
        rotateSaturation(): number;
        /**...........................................................................
         * rotateLightness
         * ...........................................................................
         * Get the next lightness value for this color
         *
         * @returns	The next lightness value
         * ...........................................................................
         */
        rotateLightness(): number;
        /**...........................................................................
         * rotateHslValue
         * ...........................................................................
         * Rotates a given HSL value by an appropriate interval to get a new color
         *
         * @param 	startVal	The value the HSL value started with
         * @param 	inc 		How much the HSL value should be incremented
         * @param 	modBy		What the mod of the HSL value should be
         * @param 	max			The maximum this HSL value can be
         * @param 	min			The minimum this HSL value can be
         *
         * @returns The newly rotate HSL value
         * ...........................................................................
         */
        rotateHslValue(startVal: number, inc: number, modBy: number, max?: number, min?: number): number;
        /**...........................................................................
         * getApparentColor
         * ...........................................................................
         * Calculates what the display color of this color would be without setting an alpha value.
         * Can calculate what the RGB value should be given a background color instead of RGBA
         *
         * @param 	backColor 	Either the color object or color string for the background color
         *
         * @returns True if we were successfully able to calculate the apparent color.
         * ...........................................................................
         */
        getApparentColor(backColor: Color | string): boolean;
        /**...........................................................................
         * compare
         * ...........................................................................
         * Finds how similar two colors are based on their HSL values
         * @param {Color} otherColor  - The color we are comparing to
         * @param multipliers - The multipliers we should use to calculate the diff
         * @returns An object containing the total diff calculation as well as the raw diff values
         * ...........................................................................
         */
        compare(other_color: Color, multipliers: IColorMultipliers): IColorMultipliers;
        /**...........................................................................
         * averageIn
         * ...........................................................................
         * Averages in another color into this one
         * @param   {Color}   other_color The other color to average in
         * @param   {boolean} no_merge    True if we should just return the averages instead of merging them in to this color
         * @returns {Color}               The resulting merged color
         * ...........................................................................
         */
        averageIn(other_color: Color, no_merge: boolean): Color | {
            hue: number;
            saturation: number;
            lightness: number;
            alpha: number;
        };
        /**...........................................................................
         * equals
         * ...........................................................................
         * Check if two colors are functionally equal
         *
         * @param 	other	The color to compare this to
         *
         * @returns	True if the colors have the same values
         * ...........................................................................
         */
        equals(other: Color): boolean;
        /**...........................................................................
         * isDark
         * ...........................................................................
         * Checks if this color object is more dark than light
         *
         * @returns True if the color is dark
         * ...........................................................................
         */
        isDark(): boolean;
        /**...........................................................................
         * isLight
         * ...........................................................................
         * Checks if this color object is more light than dark
         *
         * @returns True if the color is light
         * ...........................................................................
         */
        isLight(): boolean;
        /**...........................................................................
         * getLightness
         * ...........................................................................
         * Grabs the lightness value of this color
         *
         * @returns The value of this color's lightness
         * ...........................................................................
         */
        getLightness(): number;
    }
    /**...........................................................................
     * @class RGBColor
     * Creates a color based on RGB
     * @version 1.0
     * ...........................................................................
     */
    class RGBColor extends Color {
        /**...........................................................................
         * Creates an RGB Color
         *
         * @param 	red 	Red value for the color
         * @param 	green 	Green value for the color
         * @param 	blue 	Blue value for the color
         * @param 	alpha 	If provided, the alpha value for the color
         * ...........................................................................
         */
        constructor(red: number, green: number, blue: number, alpha?: number);
        /**...........................................................................
         * Creates an RGB Color
         *
         * @param 	rgbString 	RGB or RGBA string for the color
         * @param 	alpha 		If alpha isn't a part of the string, the alpha value
         * ...........................................................................
         */
        constructor(rgbString: string, alpha?: number);
        /**...........................................................................
         * getCurrentHue
         * ...........................................................................
         * Grabs the current RGB string for the color
         *
         * @param	withAlpha	True if the string should include the alpha value
         *
         * @returns The RGB string for the color
         * ...........................................................................
         */
        getCurrentColor(withAlpha?: boolean): string;
    }
    /**...........................................................................
     * @class HSLColor
     * Creates a color based on HSL
     * @version 1.0
     * ...........................................................................
     */
    class HSLColor extends Color {
        /**...........................................................................
         * Creates an HSL Color
         *
         * @param 	hue 			Hue to use for this color
         * @param 	saturation 		Saturation value to use for this color
         * @param 	lightness 		Lightness to use for this color
         * @param 	alpha 			If provided, alpha value for the color
         * ...........................................................................
         */
        constructor(hue: number, saturation: number, lightness: number, alpha?: number);
        /**...........................................................................
         * Creates an HSL Color
         *
         * @param 	hslString 	The HSL or HSLA string to parse
         * @param 	alpha		If alpha isn't a part of the string, separate value for it
         * ...........................................................................
         */
        constructor(hslString: string, alpha?: number);
        /**...........................................................................
         * getCurrentHue
         * ...........................................................................
         * Grabs the current HSL string for the color
         *
         * @param	withAlpha	True if the string should include the alpha value
         *
         * @returns The HSL string for the color
         * ...........................................................................
         */
        getCurrentColor(withAlpha?: boolean): string;
    }
    class HexColor extends Color {
        /**...........................................................................
         * Creates a hex color
         *
         * @param 	hexString	The hex or hex-alpha string to base this color on
         * @param 	alpha		If not a part of the string, the alpha value to use
         * 						for this color
         * ...........................................................................
         */
        constructor(hexString: string, alpha?: number);
        /**...........................................................................
         * getCurrentHue
         * ...........................................................................
         * Grabs the current hex string for the color
         *
         * @param	withAlpha	True if the string should include the alpha value
         *
         * @returns The hex string for the color
         * ...........................................................................
         */
        getCurrentColor(withAlpha?: boolean): string;
    }
    /**...........................................................................
     * @class AnyColor
     * Color class that can take in any color string
     * @version 1.0
     * ...........................................................................
     */
    class AnyColor extends Color {
        /**...........................................................................
         * Creates a color
         *
         * @param	colorString		The string to create from
         * @param	alpha			If not included in the color string, the alpha
         * 							value to use for the color
         */
        constructor(colorString: string, alpha?: number);
        /**...........................................................................
         * getCurrentColor
         * ...........................................................................
         * Grabs the current hex string for the color
         *
         * @param 	withAlpha	True if the string should contain the alpha value
         *
         * @returns	The hex string for the color
         * ...........................................................................
         */
        getCurrentColor(withAlpha?: boolean): string;
    }
}
declare namespace KIP {
    type StandardElement = HTMLElement | SVGElement;
    /** allow multiple types of elements to be added to our Drawables */
    type DrawableElement = HTMLElement | SVGElement | Drawable;
    /**...........................................................................
     * IDrawable
     * ...........................................................................
     * The core pieecs that are required by our Drawable
     * ...........................................................................
     */
    interface IDrawable {
        draw(parent?: DrawableElement): void;
        erase(): void;
    }
    /**...........................................................................
     * IDrawableElements
     * ...........................................................................
     * Collection of elements that make up a Drawable
     * ...........................................................................
     */
    interface IDrawableElements {
        /** the lowest level element of this Drawable */
        base: StandardElement;
        /** any additional elements */
        [key: string]: DrawableElement | DrawableElement[];
    }
    /**...........................................................................
     * @class Drawable
     * Creates an element
     * ...........................................................................
     */
    abstract class Drawable extends Styles.Stylable implements IDrawable {
        /** unique ID for this particular Drawable */
        protected _id: string;
        /** elements that make up this Drawable */
        protected _elems: IDrawableElements;
        /** expose the base element externally for anyone who needs it */
        readonly base: StandardElement;
        /** the parent element upon which this Drawable will be added */
        protected _parent: StandardElement;
        /**...........................................................................
         * Create a Drawable element
         * @param	baseElemTemplate	If provided, the template upon which to create the base element
         * ...........................................................................
         */
        constructor(baseElemTemplate?: IElemDefinition);
        /**...........................................................................
         * _createElements (protected, abstract)
         * ...........................................................................
         * Function that will be overridden by child classes when they are creating
         * the elements that make up a Drawable
         * ...........................................................................
         */
        protected abstract _createElements(...args: any[]): void;
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Function to determine whether we should skip the createElements. Useful in
         * cases where data needs to be present in the class before elements can be
         * created.
         *
         * @returns	True if we shouldn't create elements
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean;
        /**...........................................................................
         * draw
         * ...........................................................................
         * Draws the element of this Drawable & all children + siblings
         * @param 	parent  	The element this Drawable should be added to
         * @param 	force 		True if we need to remove & redraw this element
         * ...........................................................................
         */
        draw(parent?: StandardElement, force?: boolean): void;
        /**...........................................................................
         * _drawBase
         * ...........................................................................
         * Draws a Drawable or HTML Element
         *
         * @param	force	If true, erases and redraws the base element
         * ...........................................................................
         */
        protected _drawBase(force?: boolean): void;
        /**...........................................................................
         * erase
         * ...........................................................................
         * Remove this drawable from the canvas
         * ...........................................................................
         */
        erase(): void;
        /**...........................................................................
         * _refresh
         * ...........................................................................
         * Overridable function that refreshes the UI of this Drawable. Does not
         * guarantee that the element has been drawn.
         * ...........................................................................
         */
        protected _refresh(): void;
        /**...........................................................................
         * _afterDraw
         * ...........................................................................
         * Overridable function to make sure we can adjust sizes should we need to
         * ...........................................................................
         */
        protected _afterDraw(): void;
        /**...........................................................................
         * _onResize
         * ...........................................................................
         * Overridable function to adjust when the screen resizes
         * ...........................................................................
         */
        protected _onResize(): void;
    }
    /**...........................................................................
     * SimpleDrawable
     * ...........................................................................
     * Very basic implementation of the Drawable class that contains just a
     * single element.
     * @version 1.0
     * ...........................................................................
     */
    class SimpleDrawable extends Drawable {
        /** Simple Drawables only have a base element */
        protected _elems: {
            base: HTMLElement;
        };
        /**...........................................................................
         * create a simple Drawable element
         * @param	obj		The details about the element we should draw
         * ...........................................................................
         */
        constructor(obj: IElemDefinition);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Do nothing, since we will create the base element in the construtor
         * ...........................................................................
         */
        protected _createElements(): void;
    }
}
declare namespace KIP {
    interface OptionCallback {
        (e: Event): void;
    }
    interface Option {
        label: string;
        callback?: OptionCallback;
        elems?: {
            base?: HTMLElement;
            sub_menu?: HTMLElement;
        };
    }
    enum ContextMenuColors {
        MAIN_COLOR = 0,
        FONT_COLOR = 1,
        SUB_MENU_COLOR = 2,
        SUB_MENU_BORDER = 3,
        SUB_SUB_MENU_COLOR = 4,
        SUB_SUB_MENU_BORDER = 5,
    }
    /**...........................................................................
     * @class ContextMenu
     * creates a custom context menu
     * @version 1.0
     * ...........................................................................
     */
    class ContextMenu extends Drawable {
        /** The menu that is being shown */
        protected static _showingMenu: ContextMenu;
        /** True if we already added window listeners */
        protected static _windowListenersAdded: boolean;
        /** adds a target to this instance of the context menu */
        protected _target: HTMLElement;
        /** The collection of options available in our context menu */
        protected _options: Collection<Option>;
        /** true if we should not create our standard styles */
        protected _noStyles: boolean;
        /** The elements we need for the option menu */
        protected _elems: {
            base: HTMLElement;
            option_container?: HTMLElement;
        };
        /** public accessible function for the base element */
        readonly base: HTMLElement;
        /** collection of theme colors for the context menu */
        protected _themes: string[];
        /** the styles to use for the standard context menu */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /**...........................................................................
         * Creates a custom context (right-click) menu for a given element
         * @param 	target    	The element to create the custom menu for
         * @param 	noStyles	True if we shouldn't create css classes for the standard menu styles
         * @param	themes		Optional set of theme colors to use for the menu
         * ...........................................................................
         */
        constructor(target: HTMLElement, noStyles?: boolean, themes?: string[]);
        /**...........................................................................
         * addOption
         * ...........................................................................
         * adds an option to our context menu
         *
         * @param	opt			The option to add
         * @param	subOptions	Any nested options to include
         * @param	parent		What the parent element should be (defaults to option container)
         *
         * @returns	True if the option could be added
         * ...........................................................................
         */
        addOption(opt: Option, subOptions?: Option[], parent?: HTMLElement): boolean;
        /**...........................................................................
         * addSubOption
         * ...........................................................................
         * Adds a nested option to our context menu
         *
         * @param 	srcOption	The option we are nesting under
         * @param 	subOption 	The sub option we are currently adding
         *
         * @returns	True if the suboption was added
         * ...........................................................................
         */
        addSubOption(srcOption: Option, subOption: Option): boolean;
        /**...........................................................................
         * _buildSubMenu
         * ...........................................................................
         * creates a sub menu
         * @param	srcOption	The option to nest under
         * ...........................................................................
         */
        private _buildSubMenu(srcOption);
        /**...........................................................................
         * _getOption
         * ...........................................................................
         * grabs a particular option from our menu
         *
         * @param	lbl		The label of the option we are grabbing
         *
         * @returns	The option with this label
         * ...........................................................................
         */
        private _getOption(lbl);
        /**...........................................................................
         * removeOption
         * ...........................................................................
         * removes an option from our menu
         *
         * @param	lbl		The label of the option being removed
         *
         * @returns	True if the option was removed
         * ...........................................................................
         */
        removeOption(lbl: string): boolean;
        /**...........................................................................
         * clearOptions
         * ...........................................................................
         * Removes all of our options
         * ...........................................................................
         */
        clearOptions(): void;
        /**...........................................................................
         * _addEventListeners
         * ...........................................................................
         * Adds event listeners to the relevant pieces to show and/or hide the context menu
         * ...........................................................................
         */
        private _addEventListeners();
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Creates the basic elements of the context menu & optionally adds the
         * standard classes
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _setThemeColors
         * ...........................................................................
         * Sets the theme colors for the context menu
         * ...........................................................................
         */
        protected _setThemeColors(): void;
        /**...........................................................................
         * _hideExistingMenu
         * ...........................................................................
         * Hides whatever context menu is currently showing
         * ...........................................................................
         */
        private _hideExistingMenu();
    }
}
declare namespace KIP {
    interface OnDragEnterFunction {
        (target: HTMLElement, e: Event): void;
    }
    interface OnDragLeaveFunction {
        (target: HTMLElement, e: Event): void;
    }
    interface OnDropFunction {
        (target: HTMLElement, e: Event): void;
    }
    interface OnMoveFunction {
        (delta: IPoint): void;
    }
    enum DraggableFunctions {
        DragEnter = 0,
        DragLeave = 1,
        Drop = 2,
        Move = 3,
    }
    /**...........................................................................
     * IDraggableHandlers
     * ...........................................................................
     * Keep track of handlers for draggable elements
     * ...........................................................................
     */
    interface IDraggableHandlers {
        /** what to do when we start dragging over the target */
        onDragEnter?: OnDragEnterFunction;
        /** what to do when we stop dragging over the target */
        onDragLeave?: OnDragLeaveFunction;
        /** what to do when the element is dropped */
        onDrop?: OnDropFunction;
        /** wwhat to do when the element is moved */
        onMove?: OnMoveFunction;
    }
    /**...........................................................................
     * IDraggableOptions
     * ...........................................................................
     * Keep track of options for the draggable element
     * ...........................................................................
     */
    interface IDraggableOptions extends IDraggableHandlers {
        /** what element is considered the target of this function */
        target?: HTMLElement;
        /** keep track of whether we're using HTML5 events for dragging/dropping */
        isNonStandard?: boolean;
    }
    /** functions that can be used for a draggable element */
    type DraggableFunction = OnDragEnterFunction | OnDragLeaveFunction | OnDropFunction | OnMoveFunction;
    /**...........................................................................
     * @class Draggable
     * ...........................................................................
     * A visual element that can be dragged about the screen
     * @version 1.0
     * ...........................................................................
     */
    abstract class Draggable extends Drawable {
        /** the elements that should be treated as valid targets of the drag-drop interaction */
        private _targets;
        /** true if we should ignore HTML5 drag events and rely on manual events instead */
        private _useNonStandard;
        /** internal tracking of whether we are currently dragging */
        private _isDragging;
        /** internal tracking of the last registered mouse point */
        private _mousePoint;
        /** override what happens when the drag event goes over a particular target */
        protected _dragEnterFunc: OnDragEnterFunction;
        dragEnterFunc: OnDragEnterFunction;
        /** override what happens when the drag event leaves a particular target */
        protected _dragLeaveFunc: OnDragLeaveFunction;
        dragLeaveFunc: OnDragLeaveFunction;
        /** override what happens when the element is dropped */
        protected _dropFunc: OnDropFunction;
        dropFunc: OnDropFunction;
        /** override what happens when the element is moved */
        protected _moveFunc: OnMoveFunction;
        moveFunc: OnMoveFunction;
        /** handle the particular styles for this class */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /**...........................................................................
         * Creates a Draggable element
         *
         * @param	obj				Optional definition of what the base element of
         * 							this object looks like
         * @param	dragTarget		Optional target for dropping the element
         * @param	useNonStandard	If true, uses non HTML5 drag events (e.g. mouseup)
         * ...........................................................................
         */
        constructor(obj?: IElemDefinition, dragTarget?: HTMLElement, useNonStandard?: boolean);
        /**...........................................................................
         * _addDefaultEventFunctions
         * ...........................................................................
         * Add handlers for each of these elements
         * ...........................................................................
         */
        private _addDefaultEventFunctions();
        /**...........................................................................
         * _addStandardDragEventListeners
         * ...........................................................................
         * Add
         * ...........................................................................
         */
        private _addStandardDragEventListeners();
        /**...........................................................................
         * _addNonStandardDragEventListeners
         * ...........................................................................
         *
         * ...........................................................................
         */
        private _addNonStandardDragEventListeners();
        /**...........................................................................
         * _addNonStandardTargetEventListeners
         * ...........................................................................
         * @param target
         * ...........................................................................
         */
        private _addNonStandardTargetEventListeners(target);
        /**...........................................................................
         * _addStandardTargetEventListeners
         * ...........................................................................
         * @param target
         * ...........................................................................
         */
        private _addStandardTargetEventListeners(target);
        /**...........................................................................
         * addDragTarget
         * ...........................................................................
         * Adds a new element that can receive the draggable element
         * @param 	target 	The new target to allow drop events on
         * ...........................................................................
         */
        addDragTarget(target: HTMLElement): void;
        /**...........................................................................
         * _onDragEnterTarget
         * ...........................................................................
         * @param target
         * @param e
         * ...........................................................................
         */
        protected _onDragEnterTarget(target: HTMLElement, e: Event): void;
        /**...........................................................................
         * _onDragLeaveTarget
         * ...........................................................................
         * @param target
         * @param e
         * ...........................................................................
         */
        protected _onDragLeaveTarget(target: HTMLElement, e: Event): void;
        /**...........................................................................
         * _onMove
         * ...........................................................................
         * @param delta
         * ...........................................................................
         */
        protected _onMove(delta: IPoint): void;
        /**...........................................................................
         * _onDropOnTarget
         * ...........................................................................
         * @param target
         * @param e
         * ...........................................................................
         */
        protected _onDropOnTarget(target: HTMLElement, e: Event): void;
        /**...........................................................................
         * _overrideFunctions
         * ...........................................................................
         * @param dragEnter
         * @param dragLeave
         * @param drop
         * @param move
         * @param noReplace
         * ...........................................................................
         */
        overrideFunctions(handlers: IDraggableHandlers, noReplace?: boolean): void;
        /**...........................................................................
         * _overrideFunction
         * ...........................................................................
         * @param func
         * @param def
         * @param override
         * @param no_replace
         * ...........................................................................
         */
        private _overrideFunction(func, def, override, no_replace?);
        /**...........................................................................
         * _getDelta
         * ...........................................................................
         * Gets the delta from the last measurement and this point
         * @param	e 	The event we are measuring from
         * @returns The delta represented as a point
         * ...........................................................................
         */
        private _getDelta(e);
        /**...........................................................................
         * _updateMousePoint
         * ...........................................................................
         * Updates our internal tracking for the last mouse point
         * @param {MouseEvent} e The event we are using to set the point
         * ...........................................................................
         */
        private _updateMousePoint(e);
    }
    /**...........................................................................
     * ExistingDraggable
     * ...........................................................................
     * Turn an existing element into one that can be dragged about the screen
     * @version 1.0
     * ...........................................................................
     */
    class ExistingDraggable extends Draggable {
        /**...........................................................................
         * create an Existing Draggable element from an existing HTML or SVG element
         * @param	existingElem	The element to use as the base
         * @param	target			If included, the target of drop actions
         * @param	nonStandard		If true, uses mouseup / down instead of drag / drop
         * ...........................................................................
         */
        constructor(existingElem: StandardElement, target?: HTMLElement, nonStandard?: boolean);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Does nothing as the only element here is the base, which already exists
         * ...........................................................................
         */
        protected _createElements(): void;
    }
    /**...........................................................................
     * makeDraggable
     * ...........................................................................
     * Makes a particular element draggable
     *
     * @param 	elem         	The element to make draggable
     * @param 	target       	The drop-target of the draggable
     * @param 	non_standard 	True if we should use non-standard events
     *
     * @returns	HTML element that respects drag events
     * ...........................................................................
     */
    function makeDraggable(elem: HTMLElement, options: IDraggableOptions): StandardElement;
}
declare namespace KIP {
    class ICanvasElement {
        type: CanvasElementType;
    }
    enum CanvasElementType {
        Rectangle = 0,
        Circle = 1,
        Polygon = 2,
        Star = 3,
    }
}
declare namespace KIP {
    /** Interface for the result of a validate function */
    interface IValidateResult {
        passed: boolean;
        allowLeave?: boolean;
    }
    /** Interface for the validate function used for Editables */
    interface ValidateFunction {
        (value: string): IValidateResult;
    }
    /** Interface for the update function used for Editables */
    interface UpdateFunction<T> {
        (value: T): void;
    }
    /** Interface for the format function used for Editables */
    interface FormatFunction<T> {
        (value: T, for_edit?: boolean): string;
    }
    /** Interface for the unformat function used for Editables */
    interface UnformatFunction<T> {
        (value: string): T;
    }
    /**...........................................................................
     * IEditableOptions
     * ...........................................................................
     * Keep track of the information a caller can create an Editable with
     * ...........................................................................
     */
    interface IEditableOptions<T> extends IElemDefinition {
        /** value for the Editable */
        value?: T;
        /** type of editable element */
        inputType?: string;
        /** handle validation */
        onValidate?: ValidateFunction;
        /** handle when the editable updates */
        onUpdate?: UpdateFunction<T>;
        /** handle when we need to format data */
        formatFunc?: FormatFunction<T>;
        /** handle when we need to convert data to the unformatted version */
        onUnformat?: UnformatFunction<T>;
    }
    /**...........................................................................
     * Drawable element that also allows for editing inline
     * @class Editable
     * @version 1.0
     * ...........................................................................
     */
    class Editable<T> extends Drawable {
        /** type of input field this editable contains */
        type: string;
        /** value for the field */
        value: T;
        /** function to use on validation */
        onValidate: ValidateFunction;
        /** function to use when data gets updated */
        onUpdate: UpdateFunction<T>;
        /** function to use to format data */
        formatFunc: FormatFunction<T>;
        /** function to use to unformat data */
        onUnformat: UnformatFunction<T>;
        /** internal flag to detect if we are modifying */
        private _isModifying;
        /** elements we care about */
        protected _elems: {
            base: HTMLElement;
            display: HTMLElement;
            input: HTMLInputElement;
        };
        /** styles to use for standard Editables */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /**...........................................................................
         * Creates an Editable object
         *
         * @param	options		Any options needed to configure the editable
         * ...........................................................................
         */
        constructor(options?: IEditableOptions<T>);
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * If true, doesn't run the element creation until manually called
         * @returns	True
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create elements for the editable
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _addListeners
         * ...........................................................................
         * Add event listeners to the editable
         * ...........................................................................
         */
        private _addListeners();
        /**...........................................................................
         * _save
         * ...........................................................................
         * Save the contents of the Editable
         *
         * @returns True if the editable was successfully saved
         * ...........................................................................
         */
        private _save();
        /**...........................................................................
         * _validate
         * ...........................................................................
         * validate whether the current data in the input field is valid
         *
         * @param	content		Content to validate
         *
         * @returns	Result of the validation
         * ...........................................................................
         */
        private _validate(content);
        /**...........................................................................
         * _onValidationFailed
         * ...........................................................................
         * validation failing for this element
         *
         * @param	allowLeave	True if the user should be able to navigate away
         *
         * @returns	False
         * ...........................................................................
         */
        private _onValidationFailed(allowLeave);
        /**...........................................................................
         * _onValidationPassed
         * ...........................................................................
         * handle validation passing for this element
         * @param	content		Content to set for the editable
         * @returns	True
         * ...........................................................................
         */
        private _onValidationPassed(content);
        /**...........................................................................
         * modify
         * ...........................................................................
         * Modifies the Editable element
         *
         * @returns True if we were able to start modifying the element
         * ...........................................................................
         */
        modify(): boolean;
    }
}
declare namespace KIP {
    interface ISegment {
        start?: Date;
        end: Date;
        lbl?: string;
        color: string;
    }
    interface IProjectLine {
        id: string;
        lbl: string;
        segments: ISegment[][];
        start: Date;
        end: Date;
        src: any;
        eventGroup: SVGElement;
        segmentsGroup: SVGElement;
    }
    interface IProjectMilestone {
        id: string;
        lbl: string;
        date: Date;
        color: string;
        lineID: string;
        src: any;
    }
    interface IProjectOptions {
        showTitles: boolean;
        showHoverBubbles: boolean;
    }
    class SVGProject extends Drawable {
        private _canvas;
        private _projectLines;
        private _options;
        private _lineCount;
        constructor(options: IProjectOptions);
        protected _createElements(): void;
        addProjectLine(id: string, lbl: string, segments: ISegment[][], srcObject: any): IProjectLine;
        private __addSegmentElements(segments);
        getProjectLine(id: string): IProjectLine;
        addProjectMilestone(lineID: string, id: string, lbl: string, date: Date, color: string, srcObject?: any): IProjectMilestone;
        private __generateDefaultOptions();
    }
}
declare namespace KIP {
}
declare namespace KIP {
    /**...........................................................................
     * IDimensions
     * ...........................................................................
     * Dimensions for a rectangle
     * ...........................................................................
     */
    interface IDimensions {
        width: number;
        height: number;
    }
    /**...........................................................................
     * ZoomDeltaFunction
     * ...........................................................................
     * How to handle a zoom event
     * ...........................................................................
     */
    interface ZoomDeltaFunction {
        (): IPoint;
    }
    /**...........................................................................
     * IHTML5CanvasOptions
     * ...........................................................................
     * Options for the canvas
     * ...........................................................................
     */
    interface IHTML5CanvasOptions {
        RENDER_RATE?: number;
        ZOOM_DELTA?: ZoomDeltaFunction;
        BACKGROUND_COLOR?: string;
        SIZE?: IDimensions;
        MAX_ZOOM?: IPoint;
        MIN_ZOOM?: IPoint;
    }
    /**...........................................................................
     * IHTML5CanvasElems
     * ...........................................................................
     * Keep track of the elements that can be in a canvas
     * ...........................................................................
     */
    interface IHTML5CanvasElems extends IDrawableElements {
        base: HTMLCanvasElement;
        effectCanvas: HTMLCanvasElement;
    }
    /**...........................................................................
     * @class HTML5Canvas
     * ...........................................................................
     * class that represents a set of tools around the HTML5 canvas
     * @version 1.1
     * ...........................................................................
     */
    class HTML5Canvas extends Drawable {
        /** unique ID for the canvas */
        protected _id: string;
        /** all points that are represented in the canvas */
        private _absoluteDimensions;
        /** The current visible portion of the canvas */
        protected _relativeView: IBasicRect;
        readonly relativeView: IBasicRect;
        /** any options to configure this canvas */
        protected _options: IHTML5CanvasOptions;
        /** how much the canvas is currently zoomed */
        protected _zoomFactor: IPoint;
        zoomFactor: IPoint;
        /** tracking points for determining how much to move the canvas */
        private _startDragPoint;
        private _deltaDragPoint;
        /** determine if there is something we need to redraw */
        protected _needsRedraw: boolean;
        needsRedraw: boolean;
        /** elements for the canvas */
        protected _elems: IHTML5CanvasElems;
        /** public getter for canvas element */
        readonly canvas: HTMLCanvasElement;
        /** public getter for effects canvas */
        readonly effectCanvas: HTMLCanvasElement;
        /** rendering context for the canvas */
        protected _context: CanvasRenderingContext2D;
        readonly context: CanvasRenderingContext2D;
        /** rendering context for the effects canvas */
        protected _effectContext: CanvasRenderingContext2D;
        readonly effectContext: CanvasRenderingContext2D;
        /** create groups for each of the layers we need */
        protected _layers: CanvasGroup[];
        readonly layers: CanvasGroup[];
        /** overridable function for what should happen when the canvas is in the process of rendering */
        protected _onPreRender: Function;
        onPreRender: Function;
        /** internal variable to track whether this canvas has found iniital dimensions yet */
        private _needsInitialDimensions;
        /**...........................................................................
         * Create a HTML5 canvas element
         *
         * @param	id			Unqiue ID to use for the canvas
         * @param	options		Options to create the canvas with
         * ...........................................................................
         */
        constructor(id?: string, options?: IHTML5CanvasOptions);
        /**...........................................................................
         * _reconcileOptions
         * ...........................................................................
         * pull in default options
         *
         * @param	userOptions		The options to reconcile
         * ...........................................................................
         */
        protected _reconcileOptions(userOptions: IHTML5CanvasOptions): void;
        /**...........................................................................
         * _createDefaultOptions
         * ...........................................................................
         * set our default options
         *
         * @returns	The set of default options for canvases
         * ...........................................................................
         */
        protected _createDefaultOptions(): IHTML5CanvasOptions;
        /**...........................................................................
         * _initializeRectangles
         * ...........................................................................
         * create the rectangles that the canvas needs to care about
         * ...........................................................................
         */
        protected _initializeRectangles(): void;
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Don't let the constructor create elements
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * create the canvas element
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _createCanvas
         * ...........................................................................
         * create an actual canvas element and assigns it to our element
         *
         * @param 	isForEffects 	If true, creates an effect canvas instead
         *
         * @returns	The canvas that is created
         * ...........................................................................
         */
        protected _createCanvas(isForEffects?: boolean): HTMLCanvasElement;
        /**...........................................................................
         * draw
         * ...........................................................................
         * draws the canvas element
         *
         * @param	parent	The parent element to draw on
         * ...........................................................................
         */
        draw(parent?: HTMLElement): void;
        /**...........................................................................
         * clear
         * ...........................................................................
         * clear the canvases
         * ...........................................................................
         */
        clear(): void;
        /**...........................................................................
         * _drawEachElement
         * ...........................................................................
         * loop through every element in the canvas
         * ...........................................................................
         */
        private _drawEachElement();
        /**...........................................................................
         * _renderFrame
         * ...........................................................................
         * make sure we actually draw something
         * ...........................................................................
         */
        protected _renderFrame(): void;
        /**...........................................................................
         * addElement
         * ...........................................................................
         * add an element to the canvas
         *
         * @param	elem	The element to add to the canvas
         * ...........................................................................
         */
        addElement(elem: CanvasElement): void;
        /**...........................................................................
         * removeElement
         * ...........................................................................
         * remove an element from our internal collection
         *
         * @param	id		The id of the element to remove
         *
         * @returns	True if the element was removed
         * ...........................................................................
         */
        removeElement(id: string): boolean;
        /**...........................................................................
         * _updateAbsoluteDimensionsFromElem
         * ...........................................................................
         * Update how big the canvas is based on the elements that exist on the canvas
         *
         * @param	addedDimensions		The dimensions of the element we are adding
         * ...........................................................................
         */
        private _updateAbsoluteDimensionsFromElem(addedDimensions);
        /**...........................................................................
         * _getOrCreateLayer
         * ...........................................................................
         * find the existing layer or create it if it doesn't exist
         *
         * @param	layerIdx	The index of the layer
         *
         * @returns	The group for the layer
         * ...........................................................................
         */
        protected _getOrCreateLayer(layerIdx: number): CanvasGroup;
        /**...........................................................................
         * _onMouseWheel
         * ...........................................................................
         * handle the mousewheel event
         *
         * @param	event	The actual event triggered by the mousewheel
         * ...........................................................................
         */
        private _onMouseWheel(event);
        /**...........................................................................
         * zoom
         * ...........................................................................
         * actually zoom the canvas an appropriate amount
         *
         * @param	delta	The amount to zoom by
         * ...........................................................................
         */
        zoom(delta: number): void;
        /**...........................................................................
         * changeView
         * ...........................................................................
         * update the view being displayed on the canvas
         *
         * @param	newDisplay	The dimensions of the new view
         * ...........................................................................
         */
        changeView(newDisplay: IBasicRect): void;
        /**...........................................................................
         * _onDrag
         * ...........................................................................
         * move the canvas around via a mouse drag
         *
         * @param	delta	The amount the mouse has dragged
         * ...........................................................................
         */
        private _onDrag(delta);
        /**...........................................................................
         * _calculateNewCornerFromDelta
         * ...........................................................................
         * take zoom into account when calculating the new corner of the canvas
         *
         * @param	delta	The amount that has been dragged
         *
         * @returns	The new corner for the canvas
         * ...........................................................................
         */
        private _calculateNewCornerFromDelta(delta);
        /**...........................................................................
         * pan
         * ...........................................................................
         * handle a pan event
         *
         * @param	cornerPoint		The new corner for the canvas
         * ...........................................................................
         */
        pan(cornerPoint: IPoint): void;
        /**...........................................................................
         * _addEventListeners
         * ...........................................................................
         * add all event listeners for the canvas itself
         * ...........................................................................
         */
        private _addEventListeners();
        /**...........................................................................
         * _onClick
         * ...........................................................................
         * handle clicks on the canvas
         *
         * @param	e		The event itself of the mouse click
         * @param	point	The point that was clicked
         * ...........................................................................
         */
        private _onClick(e, point);
        /**...........................................................................
         * _onHover
         * ...........................................................................
         * handle hovering over elements on the canvas
         *
         * @param	e		The actual mouseover event
         * @param	point	The point that's being hovered over
         * ...........................................................................
         */
        private _onHover(e, point);
        /**...........................................................................
         * _handleEvent
         * ...........................................................................
         * handle a general event
         *
         * @param	eventType	The type of event being handled
         * @param	point		The point this event applies to
         * @param	e			The actual event data
         * ...........................................................................
         */
        private _handleEvent(eventType, point, e);
        /**...........................................................................
         * convertRelativePointToAbsolutePoint
         * ...........................................................................
         * convert a point from our relative canvas frame (e.g. visible frame) and
         * the physical space
         *
         * @param	relativePt	The point to convert
         *
         * @returns	The converted point
         * ...........................................................................
         */
        convertRelativePointToPhysicalPoint(relativePt: IPoint): IPoint;
        /**...........................................................................
         * convertPhysicalPointToRelativePoint
         * ...........................................................................
         * convert a physical point to one within the visible canvas frame
         *
         * @param	physicalPt	The point to convert
         *
         * @returns	The converted relative point
         * ...........................................................................
         */
        convertPhysicalPointToRelativePoint(physicalPt: IPoint): IPoint;
        /**...........................................................................
         * convertAbsolutePointToRelativePoint
         * ...........................................................................
         * convert a point from absolute position to a visible point
         * ...........................................................................
         */
        convertAbsolutePointToRelativePoint(absolutePt: IPoint): IPoint;
        /**...........................................................................
         * convertRelativePointToAbsolutePoint
         * ...........................................................................
         * convert a point from a visible point to an absolute point
         *
         * @param	relativePt	The point in relative dimensions
         *
         * @returns	THe converted absolute point
         * ...........................................................................
         */
        convertRelativePointToAbsolutePoint(relativePt: IPoint): IPoint;
        /**...........................................................................
         * convertAbsoluteRectToRelativeRect
         * ...........................................................................
         * Turn a set of absolute dimensions to their relative counterpart
         *
         * @param 	absoluteRect 	The absolute rect to convert to relative dimensions
         *
         * @returns	The converted rectangle
         * ...........................................................................
         */
        convertAbsoluteRectToRelativeRect(absoluteRect: IBasicRect): IBasicRect;
        /**...........................................................................
         * debugRelativeDimensions
         * ...........................................................................
         * debug the current view of the canvas
         * ...........................................................................
         */
        debugRelativeDimensions(): void;
    }
}
declare namespace KIP {
    /**...........................................................................
     * ElementType
     * ...........................................................................
     * The type of element we're drawing
     * ...........................................................................
     */
    enum ElementType {
        Rectangle = 0,
        Text = 1,
        Circle = 2,
        Path = 3,
        Group = 4,
    }
    /**...........................................................................
     * EventTypeEnum
     * ...........................................................................
     * Handle all of the events we might need
     * ...........................................................................
     */
    enum EventTypeEnum {
        CLICK = 0,
        HOVER = 1,
        LEAVE = 2,
        R_CLICK = 3,
        DBL_CLICK = 4,
        KEY_PRESS = 5,
        FOCUS = 6,
        BLUR = 7,
    }
    /** declare the style options supported by cavas elements */
    /**...........................................................................
     * CanvasEventHandler
     * ...........................................................................
     * interface for callbacks handling events
     *
     * @param	pt
     * @param	e
     * ...........................................................................
     */
    interface CanvasEventHandler {
        (pt: IPoint, e?: Event): void;
    }
    /**...........................................................................
     * CanvasMouseEventHandler
     * ...........................................................................
     * interface for callbacks handling mouse events
     * @param	pt
     * @param	e
     * ...........................................................................
     */
    interface CanvasMouseEventHandler extends CanvasEventHandler {
        (pt: IPoint, e?: MouseEvent): void;
    }
    /**...........................................................................
     * CanvasKeyboardEventHandler
     * ...........................................................................
     * interface for callbacks handling keyboard events
     * @param	pt
     * @param	e
     * ...........................................................................
     */
    interface CanvasKeyboardEventHandler extends CanvasEventHandler {
        (pt: IPoint, e?: KeyboardEvent): void;
    }
    /**...........................................................................
     * ICanvasElementTransform
     * ...........................................................................
     *  interface for handling transforms on click / hover
     * ...........................................................................
     */
    interface ICanvasElementTransform {
        /** how we should scale the element */
        scale?: number;
        /** if set, scale x and y differently */
        unevenScale?: IPoint;
        /** the color this element should shift to */
        color?: string;
    }
    /**...........................................................................
     * @class CanvasElement
     * ...........................................................................
     * create a canvas element
     * @version 1.1
     * @author	Kip Price
     * ...........................................................................
     */
    abstract class CanvasElement {
        /** unique ID for this particular element */
        protected _id: string;
        readonly id: string;
        /** determines whether this is an effect element */
        protected _isEffect: boolean;
        /** keep track of elements for thsi Drawable */
        protected _elems: IDrawableElements;
        /** keep track of the type of element */
        readonly abstract type: ElementType;
        protected _type: ElementType;
        /** Track the canvas for ease of grabbing global stats */
        protected _canvas: HTML5Canvas;
        canvas: HTML5Canvas;
        /** Every element will have a direct CanvasGroup as a parent (except for the top level CanvasGroup) */
        protected _parent: CanvasGroup;
        parent: CanvasGroup;
        /** style for the element */
        protected _style: CanvasElementStyle;
        style: CanvasElementStyle;
        /** how this element will transform */
        protected _transformDetails: ICanvasElementTransform;
        /** layer at which the element should appear. Defaults to 1 */
        protected _layer: number;
        layer: number;
        /** determines whether this element is off-screen */
        protected _isOffScreen: boolean;
        readonly isOffScreen: boolean;
        /** real dimensions for the element */
        protected _dimensions: IBasicRect;
        dimensions: IBasicRect;
        /** where the element should current display */
        protected _displayDimensions: IBasicRect;
        readonly displayDimensions: IBasicRect;
        /** where the element was previously positioned */
        protected _oldDimensions: IBasicRect;
        /** detect whether the element has been drawn*/
        protected _isDrawn: boolean;
        /** determines if this element is the target of a hover */
        protected _isHoverTarget: boolean;
        isHoverTarget: boolean;
        /** listeners for events */
        protected _eventFunctions: CanvasEventHandler[][];
        /** handle hiding elements */
        protected _isHidden: boolean;
        readonly isHidden: boolean;
        /**...........................................................................
         * create a canvas element
         *
         * @param	id			The unique ID for this
         * @param 	isEffect 	If true, treats this element as an effect
         * ...........................................................................
         */
        constructor(id: string, isEffect?: boolean);
        /**...........................................................................
         * _initializeRects
         * ...........................................................................
         * create the initial display rectangle
         * ...........................................................................
         */
        protected _initializeRects(): void;
        /**...........................................................................
         * _applyStyle
         * ...........................................................................
         * update the context to use this element's style
         *
         * @param	context		The Canvas context to draw on
         * ...........................................................................
         */
        protected _applyStyle(context: CanvasRenderingContext2D): void;
        /**...........................................................................
         * _restoreStyle
         * ...........................................................................
         * set the context style back to what it originally was
         *
         * @param	context
         * ...........................................................................
         */
        protected _restoreStyle(context: CanvasRenderingContext2D): void;
        /**...........................................................................
         * transform
         * ...........................................................................
         * handle a temporary transform for the element
         *
         * @param 	transformDetails
         * ...........................................................................
         */
        transform(transformDetails: ICanvasElementTransform): void;
        /**...........................................................................
         * _cloneForEffect
         * ...........................................................................
         * abstract method to get a new cloned element
         *
         * @param	id
         *
         * @returns
         * ...........................................................................
         */
        protected abstract _cloneForEffect(id: string): CanvasElement;
        /**...........................................................................
         * _cloneStyle
         * ...........................................................................
         * copy style from one elem for use in another
         *
         * @returns
         * ...........................................................................
         */
        private _cloneStyle();
        /**...........................................................................
         * _scale
         * ...........................................................................
         * standard scale algorithm
         * @param	scaleAmt
         * ...........................................................................
         * */
        protected _scale(scaleAmt: number): void;
        /**...........................................................................
         * updateDimensions
         * ...........................................................................
         * update the internal dimensions of the element
         * @param	canvasDimensions
         * ...........................................................................
         */
        updateDimensions(canvasDimensions: IBasicRect): void;
        /**...........................................................................
         * adjustDimensions
         * ...........................................................................
         * shift the dimensions of the element based on the reference point
         * @param	adjustPt
         * ...........................................................................
         * */
        adjustDimensions(adjustPt: IPoint): void;
        /**...........................................................................
         * draw
         * ...........................................................................
         * abstract method that each child element will implement
         * ...........................................................................
         */
        draw(): void;
        /**...........................................................................
         * _onDraw
         * ...........................................................................
         * Abstract function that will be implemented by each of the children of this class
         * @param	context
         * ...........................................................................
         */
        protected abstract _onDraw(context: CanvasRenderingContext2D): void;
        /**...........................................................................
         * _setIsOffScreen
         * ...........................................................................
         * determine whether this element is off screen
         * @param	canvasDimensions
         * ...........................................................................
         * */
        protected _setIsOffScreen(canvasDimensions: IBasicRect): void;
        /**...........................................................................
         * _setDimensions
         * ...........................................................................
         * allow outsiders to update the internal set of dimensions for this element
         * @param	dim
         * ...........................................................................
         */
        protected _setDimensions(dim: IBasicRect): void;
        /**...........................................................................
         * _setCanvas
         * ...........................................................................
         * Set our internal canvas
         * @param canvas
         * ...........................................................................
         */
        protected _setCanvas(canvas: HTML5Canvas): void;
        /** collect event listeners */
        addEventListener(eventType: EventTypeEnum, eventFunc: CanvasEventHandler): void;
        /** handle click events */
        click(pt: IPoint, e: MouseEvent): void;
        /** handle double clicks */
        doubleClick(pt: IPoint, e: MouseEvent): void;
        /** handle the right click */
        rightClick(pt: IPoint, e: MouseEvent): void;
        /** handle when the mouse enters the element */
        hover(pt: IPoint, e: MouseEvent): void;
        /** handle when the mouse leaves the element */
        leave(pt: IPoint, e: MouseEvent): void;
        /** handle the keypress event */
        keyPress(pt: IPoint, e: KeyboardEvent): void;
        /** handle the focus event */
        focus(pt: IPoint, e: Event): void;
        /** handle the blur event */
        blur(pt: IPoint, e: Event): void;
        /**...........................................................................
         * handleEvent
         * ...........................................................................
         * generic handler for all events
         * ...........................................................................
         */
        handleEvent(eventType: EventTypeEnum, pt: IPoint, e: Event): void;
        /**...........................................................................
         * swapVisibilty
         * ...........................................................................
         * Change whether this element is hidden or shown
         * ...........................................................................
         */
        swapVisibility(): void;
        /**...........................................................................
         * hide
         * ...........................................................................
         * Hide this element
         * ...........................................................................
         */
        hide(): void;
        /**...........................................................................
         * show
         * ...........................................................................
         * Show this element if it was hidden
         * ...........................................................................
         */
        show(): void;
        /**...........................................................................
         * _debugDimensions
         * ...........................................................................
         * display dimensions for debugging purposes
         * ...........................................................................
         */
        protected _debugDimensions(): void;
        /**...........................................................................
         * debugDimensions
         * ...........................................................................
         * public function for debugging purposes
         * ...........................................................................
         */
        debugDimensions(): void;
    }
}
declare namespace KIP {
    /** class that stores collections of other canvas elements */
    class CanvasGroup extends CanvasElement {
        /** keep track of the elements in this group */
        protected _elements: Collection<CanvasElement>;
        /** the type of element this is */
        readonly type: ElementType;
        /** keep track of the reference point for the group */
        protected _referencePoint: IPoint;
        referencePoint: IPoint;
        /** the point for reference for display */
        protected _displayReferencePoint: IPoint;
        /** if true, scales with the rest of the canvas */
        protected _respondToScale: boolean;
        /** true if we haven't yet set the dimensions for the group */
        private _needsInitialDimensions;
        /**...........................................................................
         * isHoverTarget
         * ...........................................................................
         * groups handle whether they are a hover target a little differently
         *
         * @returns	True if this element is a target for hover
         * ...........................................................................
         */
        readonly isHoverTarget: boolean;
        /**...........................................................................
         * create a group element that joins other elements together
         *
         * @param	id			The unique ID for the element
         * @param	refPoint	The reference point to use
         * ...........................................................................
         */
        constructor(id: string, refPoint?: IPoint);
        /**...........................................................................
         * _initializeRects
         * ...........................................................................
         * handle the initial rects needed by the group
         * ...........................................................................
         */
        protected _initializeRects(): void;
        /**...........................................................................
         * _onDraw
         * ...........................................................................
         * handle drawing the group
         *
         * @param	context		The context upon which to draw this element
         * ...........................................................................
         */
        protected _onDraw(context: CanvasRenderingContext2D): void;
        /**...........................................................................
         * updateDimensions
         * ...........................................................................
         * update the space occupied by this group
         *
         * @param	visibleWindow	The visible view into the canvas
         * ...........................................................................
         */
        updateDimensions(visibleWindow: IBasicRect): void;
        /**...........................................................................
         * addElement
         * ...........................................................................
         * add an element to this group
         *
         * @param	The element to add to the group
         * ...........................................................................
         */
        addElement(elem: CanvasElement): void;
        /**...........................................................................
         * _updateInternalDinensionsFromElement
         * ...........................................................................
         * make sure our internal dimensions match what our elements
         *
         * @param	elem	THe element we're adding to update dimensions for
         * ...........................................................................
         */
        private _updateInternalDimensionsFromElement(elem);
        /**...........................................................................
         * handleEvent
         * ...........................................................................
         * groups need some special handling since they need to pass on their events
         *
         * @param	eventType
         * @param	pt			The point
         * @param	e			The actual event we are handling
         * ...........................................................................
         */
        handleEvent(eventType: EventTypeEnum, pt: IPoint, e: Event): void;
        /**...........................................................................
         * _clearHover
         * ...........................................................................
         * clear hover styles that may have been applied already
         * ...........................................................................
         */
        private _clearHover(relativePoint, e);
        /** find the elements that are located at the provided point */
        private _findElementsAtPoint(pt);
        /** remove elements from layers */
        removeElement(id: string): boolean;
        protected _cloneForEffect(id: string): CanvasGroup;
        /**...........................................................................
         * _scale
         * ...........................................................................
         * groups scale by each of their parts scaling
         *
         * @param	scaleAmt	The amount to scale by
         * ...........................................................................
         */
        protected _scale(scaleAmt: number): void;
        /**...........................................................................
         * adjustDimensions
         * ...........................................................................
         * adjust the dimensions of this group + its children
         *
         * @param	adjustPt	The point we're adjusting to
         * ...........................................................................
         */
        adjustDimensions(adjustPt: IPoint): void;
        /**...........................................................................
         * _setCanvas
         * ...........................................................................
         * Set our internal canvas
         *
         * @param 	canvas	The canvas to set internally
         * ...........................................................................
         */
        protected _setCanvas(canvas: HTML5Canvas): void;
    }
}
declare namespace KIP {
    type CanvasColor = string | CanvasGradient | CanvasPattern;
    enum StyleChangeEnum {
        FILL_COLOR = 0,
        STROKE_COLOR = 1,
        FONT_FAMILY = 2,
        FONT_VARIANT = 3,
        FONT_SIZE = 4,
        STROKE_SIZE = 5,
        TEXT_ALIGN = 6,
        FONT = 7,
    }
    interface StyleChangeHandler {
        (): void;
    }
    class CanvasElementStyle {
        protected _fillColor: CanvasColor;
        fillColor: CanvasColor;
        protected _strokeColor: CanvasColor;
        strokeColor: CanvasColor;
        protected _fontFamily: string;
        fontFamily: string;
        protected _fontVariant: string;
        fontVariant: string;
        protected _fontSize: number;
        fontSize: number;
        protected _strokeSize: number;
        strokeSize: number;
        protected _textAlign: string;
        textAlign: string;
        protected _font: string;
        font: string;
        protected _listeners: StyleChangeHandler[][];
        protected _oldStyle: CanvasElementStyle;
        /** nothing to construct */
        constructor(style?: CanvasElementStyle);
        addStyleChangeListener(changeType: StyleChangeEnum, func: StyleChangeHandler): void;
        protected _onChange(changeType: StyleChangeEnum): void;
        setStyle(context: CanvasRenderingContext2D): void;
        restoreStyle(context: CanvasRenderingContext2D): void;
        protected _saveOffOldStyle(context: CanvasRenderingContext2D): void;
        protected _applyStyleToContext(context: CanvasRenderingContext2D, style: CanvasElementStyle): void;
    }
}
declare namespace KIP {
    class CircleElement extends CanvasElement {
        private _center;
        private _radius;
        private _displayRadius;
        readonly type: ElementType;
        constructor(id: string, center: IPoint, radius: IPoint);
        constructor(id: string, center: IPoint, radius: number);
        protected _onDraw(context: CanvasRenderingContext2D): void;
        /** change the dimensions based on a pan / zoom change on the canvas */
        updateDimensions(canvasDimensions: IBasicRect): void;
        /** override default dimensions for circle specific dimensions */
        protected _debugDimensions(): void;
        /** create a clone to be used in effect calculations */
        protected _cloneForEffect(id: string): CircleElement;
        /** allow effect elements to be resized */
        protected _scale(scaleAmt: number): void;
    }
}
declare namespace KIP {
    class PathElement extends CanvasElement {
        protected _points: IPoint[];
        protected _displayPoints: IPoint[];
        readonly type: ElementType;
        private _needsInitialDimensions;
        constructor(id: string, points?: IPoint[]);
        /** create an empty dimensions rect */
        protected _initializeRects(): void;
        /** add a new point to this path */
        addPoint(point: IPoint): void;
        /** loop through and update extremas based on all points */
        private _updateExtremaFromPoints();
        /** check if extrema need to be updated for a single point */
        private _updateExtremaFromPoint(point);
        /** actually create the path on the canvas */
        protected _onDraw(context: CanvasRenderingContext2D): void;
        /**  */
        updateDimensions(canvasDimensions: IBasicRect): void;
        adjustDimensions(adjustPt: IPoint): void;
        /** clone in order to be able to apply various effects */
        protected _cloneForEffect(id: string): PathElement;
        protected _scale(scaleAmt: number): void;
        private _scalePoint(pt, center, scaleAmt);
    }
}
declare namespace KIP {
    class RectangleElement extends CanvasElement {
        protected _type: ElementType;
        protected _oldDimensions: IBasicRect;
        protected _borderRadius: number;
        borderRadius: number;
        protected _displayBorderRadius: IPoint;
        readonly type: ElementType;
        /** create a rectangle element
         * @param id - unique ID for the rectangle
         * @param dimensions - the size of the rectangle (in canvas coordinates)
         */
        constructor(id: string, dimensions: IBasicRect);
        /** actually draw the rectangle */
        protected _onDraw(context: CanvasRenderingContext2D): void;
        private _unroundedRect(context);
        private _roundedRect(context);
        updateDimensions(canvasDimensions: IBasicRect): void;
        /** clone an element for an effect to be applied */
        protected _cloneForEffect(id: string): RectangleElement;
    }
}
declare namespace KIP {
    class TextElement extends CanvasElement {
        protected _type: ElementType;
        private _text;
        text: string;
        private _fixed;
        fixed: boolean;
        readonly type: ElementType;
        /** handle the canvas being assigned to the  */
        protected _setCanvas(canvas: HTML5Canvas): void;
        /** create the text element */
        constructor(id: string, text: string, point: IPoint);
        private _addStyleChangeListener();
        /** determine how big the text should be */
        private _calculateTextMetrics();
        /** draw the text element on the canvas */
        protected _onDraw(context: CanvasRenderingContext2D): void;
        /** clone a text effect */
        protected _cloneForEffect(id: string): TextElement;
    }
}
declare namespace KIP.Events {
    /**...........................................................................
     * IEvent
     * ...........................................................................
     * Keeps track of the basics of an event
     * ...........................................................................
     */
    interface IEvent {
        /** name of the event, largely for readability */
        name: string;
        /** the key of the event, under which this event will be stored */
        key: string;
    }
    /**...........................................................................
     * IListener
     * ...........................................................................
     * Creates a function ready to receive context from a particular event firing
     *
     * @param	ev	The Event that is being fired
     * ...........................................................................
     */
    interface IListener {
        (ev: Event): void;
    }
    /**...........................................................................
     * IListenerData
     * ...........................................................................
     * Keeps track of all info we need about an event listener
     * ...........................................................................
     */
    interface IListenerData {
        /** the function to call when the appropriate event is fired */
        func: IListener;
        /** if included, ensures that the element issuing the event is the one registered before calling the listener */
        target?: any;
        /** if included, a unique qualifier of the listener */
        uniqueId?: string;
    }
    /**...........................................................................
     * IEventContext
     * ...........................................................................
     * Keeps track of the context atound a particular event dispatch
     * ...........................................................................
     */
    interface IEventContext {
        /** if included, who should be considered the element triggering this event */
        target?: any;
        /** keep track of any other data */
        [key: string]: any;
    }
    class Event {
        /** keep track of the name of the event */
        protected _name: string;
        /** key to use to associate this [articular event] */
        protected _key: string;
        /** colletcion of areas of code that care when this event fires */
        protected _listeners: Collection<IListenerData>;
        /** keep track of how many listeners we've added */
        protected _numOfListeners: number;
        /** grab the appropriate context for the event */
        protected _context: IEventContext;
        readonly context: IEventContext;
        /**...........................................................................
         * Creates a new Event
         * @param 	details 	The specs for this particular event
         * ...........................................................................
         */
        constructor(details: IEvent);
        /**...........................................................................
         * addListener
         * ...........................................................................
         * add a listener to our collection (with the option to replace if using a unique key)
         *
         * @param	listenerData	The listener features to add
         * ...........................................................................
         */
        addListener(listenerData: IListenerData): void;
        /**...........................................................................
         * removeEventListener
         * ...........................................................................
         *  allow a listener to be skipped
         *
         * @param	uniqueId	Unique identifier for the listener to remove
         * ...........................................................................
         */
        removeEventListener(uniqueId: string): void;
        /**...........................................................................
         * notifyListeners
         * ...........................................................................
         * Let listeners know that an event that they care about has been fired
         *
         * @param 	context 	The context to send along with the event
         * ...........................................................................
         */
        notifyListeners(context: IEventContext): void;
    }
}
declare namespace KIP.Events {
    /**...........................................................................
     * @class EventHandler
     * Handles all events that are raised by any applications
     * @version 1.0
     * ...........................................................................
     */
    class EventHandler {
        static eventTypes: {
            test: string;
            [key: string]: string;
        };
        /** keep track of all the events that are registered to this event handler */
        protected static _events: Collection<Event>;
        /**...........................................................................
         * createEvent
         * ...........................................................................
         * create a new event with a partular key and name
         *
         * @param	details		Specs for the event we are creating
         *
         * @returns	True if a new event was created
         * ...........................................................................
         */
        static createEvent(details: IEvent): boolean;
        /**...........................................................................
         * dispatchEvent
         * ...........................................................................
         * handle notifying listeners about an event that occurred
         *
         * @param	key			The key used by this particular event
         * @param	context		THe additional context to use for the event
         * ...........................................................................
         * */
        static dispatchEvent(key: string, context: IEventContext): void;
        /**...........................................................................
         * addEventListener
         * ...........................................................................
         * register an additional listener with a particular event
         *
         * @param	key				The key to use for the event
         * @param	listenerData	The data to use for the listener being added
         * ...........................................................................
         */
        static addEventListener(key: string, listenerData: IListenerData): void;
        /**...........................................................................
         * removeEventListener
         * ...........................................................................
         *  remove a particular event listener
         *
         * @param	uniqueId	The unique ID for this listener
         * @param	key			If specified, the particular event to remove from
         * ...........................................................................
         */
        static removeEventListener(uniqueID: string, key?: string): void;
    }
    /**...........................................................................
     * createEvent
     * ...........................................................................
     * Creates a new type of event that can now be listened for
     *
     * @param 	details 	The specs with which to create the event
     *
     * @returns	True if the event was created
     * ...........................................................................
     */
    function createEvent(details: IEvent): boolean;
    /**...........................................................................
     * dispatchEvent
     * ...........................................................................
     * Sends out the notification that an event occurred
     *
     * @param 	key 		The key of the event being sent out
     * @param 	context 	Any additional context needed by listeners of the event
     * ...........................................................................
     */
    function dispatchEvent(key: string, context: IEventContext): void;
    /**...........................................................................
     * addEventListener
     * ...........................................................................
     * @param 	key 			The key of the event to listen on
     * @param 	listenerData	Context for the event listener
     * ...........................................................................
     */
    function addEventListener(key: string, listenerData: IListenerData): void;
}
declare namespace KIP.ForceGraph {
    interface IConnectionParams<T> {
        id?: string;
        node?: Node<T>;
    }
    class ForceGraph<T> extends Drawable {
        private _width;
        private _height;
        protected _nodes: Collection<Node<T>>;
        protected _isDirected: boolean;
        constructor(isDirected: boolean);
        protected _createElements(): void;
        addNode(id: string, data: T): Node<T>;
        addConnectionToNode(parent: IConnectionParams<T>, target: IConnectionParams<T>): void;
        private _getNodeFromConnectionParams(params);
        arrangeNodes(): void;
        /**
         * _getNodeWithMostConnections
         *
         * Find the most connected node so as to start with it, as it will take the most planning
         */
        private _getNodeWithMostConnections();
        private _getStartNode();
    }
}
declare namespace KIP.ForceGraph {
    class Node<T> {
        protected _data: T;
        readonly data: T;
        protected _incomingConnections: Node<T>[];
        readonly incomingConnections: Node<T>[];
        protected _outgoingConnections: Node<T>[];
        readonly outgoingConnections: Node<T>[];
        readonly connections: Node<T>[];
        protected _isDirected: boolean;
        protected _position: IPoint;
        position: IPoint;
        protected _radius: number;
        readonly radius: number;
        constructor(data: T, isDirected: boolean);
        addConnection(otherNode: Node<T>): void;
        addIncomingConnection(otherNode: Node<T>): void;
    }
}
declare namespace KIP.Forms {
    /** type of the element */
    enum FormElementTypeEnum {
        TEXT = 1,
        NUMBER = 2,
        DATE = 3,
        TIME = 4,
        DATE_TIME = 5,
        SELECT = 6,
        CHECKBOX = 7,
        TEXTAREA = 8,
        ARRAY = 9,
        ARRAY_CHILD = 10,
        TOGGLE_BUTTON = 11,
        CUSTOM = 12,
        SECTION = 13,
        HIDDEN = 14,
        FILE_UPLOAD = 15,
        FILE_PATH = 16,
        COLOR = 17,
    }
    interface ICanSaveTracker {
        hasErrors: boolean;
        hasMissingRequired: boolean;
    }
    /** options for layout */
    enum FormElementLayoutEnum {
        MULTILINE = 0,
        TABLE = 1,
        FLEX = 2,
        LABEL_AFTER = 3,
    }
    /** handle more type safeness of form */
    type IFormElements<F> = {
        [P in keyof F]: FormElement<F[P]>;
    };
    /** standard elements for a displayable form element */
    interface IFormDisplay {
        label?: string;
        cls?: string;
        layout?: FormElementLayoutEnum;
    }
    interface IFormOptions extends IFormDisplay {
        popupForm?: boolean;
        noStandardStyles?: boolean;
        colors?: string[];
        addlButtons?: IFormButton[];
    }
    interface IFormButton {
        display: string;
        cls?: string;
        callback: Function;
    }
    /** handle the template for setting up a form */
    interface IFormElemTemplate<T> extends IFormDisplay {
        value?: T;
        position?: number;
        required?: boolean;
        onValidate?: IValidateFunc<T>;
        onOtherChange?: IOtherChangeFunc<T>;
        validationType?: ValidationType;
        [key: string]: any;
    }
    interface IFormArrayTemplate<T> extends IFormElemTemplate<T[]> {
        newLabel?: string;
    }
    /** select-specific template options */
    interface IFormSelectTemplate extends IFormElemTemplate<number> {
        options: ISelectOptions;
    }
    interface IFormToggleButtonTemplate<T> extends IFormElemTemplate<any> {
        options?: IToggleBtnOption<any>[];
    }
    interface IFormSingleSelectButtonTemplate<T> extends IFormToggleButtonTemplate<T> {
        options?: IToggleBtnOption<T>[];
    }
    interface IFormMultiSelectButtonTemplate<T> extends IFormToggleButtonTemplate<T[]> {
        options?: IToggleBtnOption<T>[];
    }
    interface IFormFileElemTemplate<T> extends IFormElemTemplate<T> {
        attr?: IAttributes;
    }
    interface IFormFilePathElemTemplate extends IFormFileElemTemplate<string> {
        onSave: IFileSaveCallback;
        onChange: IFileChangeCallback;
    }
    interface IErrorString {
        title?: string;
        details?: string;
    }
    /** handle when the element's data has changed */
    interface IValidateFunc<T> {
        (data: T, errorString: IErrorString): boolean;
    }
    /** handle when another element of the form has changed */
    interface IOtherChangeFunc<T> {
        (otherID: string, data: any, formElement: FormElement<T>, context?: any): void;
    }
    interface IFileChangeCallback {
        (files: FileList): string;
    }
    interface IFileSaveCallback {
        (files: FileList): void;
    }
    /** handle multiple types of evaluable elements */
    type EvaluableElem = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | IElemWithValue;
    /** handle an interface for anything that can contain a value */
    interface IElemWithValue extends HTMLElement {
        value: any;
        checked?: boolean;
    }
    /** consistent set of elements for all Form Elements */
    interface IFormHTMLElements {
        core: HTMLElement;
        error?: HTMLElement;
        lbl?: HTMLElement;
        input?: EvaluableElem;
        childrenContainer?: HTMLElement;
        [key: string]: HTMLElement;
    }
    /** allow another caller to listen to a form element changing */
    interface IListenerFunction<T> {
        (key: string, data: T): void;
    }
    enum DirectionType {
        FORWARD = 1,
        BACKWARD = -1,
        MOVE = 0,
    }
    enum ValidationType {
        KEEP_ERROR_VALUE = 1,
        RESTORE_OLD_VALUE = 2,
        CLEAR_ERROR_VALUE = 3,
        NO_BLUR_PROCESSED = 4,
    }
}
declare namespace KIP.Forms {
    /**
     * determine whether a particular parameter is a form element
     * @param elem - Either a FormElement or a FormTemplate
     * @returns True if elem is a form Element
     */
    function isFormElement<T>(elem: IFormElemTemplate<T> | FormElement<T>): elem is FormElement<T>;
    /** create the general form element class that all others extend */
    abstract class FormElement<T> extends Styles.Stylable {
        /** id of the element */
        protected _id: string;
        readonly id: string;
        /** store the appropriate class for the element */
        protected _cls: string;
        /** store the standard class for all form elements */
        protected readonly _standardCls: string;
        /** label for the element */
        protected _label: string;
        /** what type of form element it is */
        protected _type: FormElementTypeEnum;
        readonly type: FormElementTypeEnum;
        /** abstract property for the default value of child elements */
        protected readonly abstract _defaultValue: T;
        /** abstract property for the default class of child elements */
        protected readonly abstract _defaultCls: string;
        /** the current value of the element */
        protected _data: T;
        data: T;
        /** what to use to validate the function */
        protected _onValidate: IValidateFunc<T>;
        /** handler for when another element changes */
        protected _onOtherChange: IOtherChangeFunc<T>;
        readonly onOtherChange: IOtherChangeFunc<T>;
        /** elements of the form element */
        protected _elems: IFormHTMLElements;
        /** how this form element should be laid out */
        protected _layout: FormElementLayoutEnum;
        /** whether this element is required */
        protected _isRequired: boolean;
        /** where this element sits in the order of the form */
        protected _position: number;
        /** handle listeners for events */
        protected _listeners: IListenerFunction<T>[];
        /** keep track of where this form is drawn */
        protected _parent: HTMLElement;
        /** keep track of the form template */
        protected _template: IFormElemTemplate<T>;
        readonly template: IFormElemTemplate<T>;
        /** keep track of whether we are currently in an error state */
        protected _hasErrors: boolean;
        readonly hasErrors: boolean;
        /** keep track of how this field should be validated */
        protected _validationType: ValidationType;
        readonly validationType: ValidationType;
        /** placeholder for individual CSS styles */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** ...........................................................................
         * Create a Form Element
         * @param id - The ID of the element; should be unique in the form
         * @param data - A template of what should be contained in a form element
         * @returns a new FormElement instance
         * ...........................................................................
         */
        constructor(id: string, data?: FormElement<T>);
        /**...........................................................................
         * Create a Form Element
         * @param   id      The ID of the element; should be unique in the form
         * @param   data    An existing FormElement to clone from
         * @returns A new FormElement instance
         * ...........................................................................
         */
        constructor(id: string, data?: IFormElemTemplate<T>);
        /**...........................................................................
         * _cloneFromFormElement
         * ...........................................................................
         *  handle creation of the element through copying over an existing element
         * ...........................................................................
         */
        protected _cloneFromFormElement(elem: FormElement<T>): void;
        /**...........................................................................
         * _parseElemTemplate
         * ...........................................................................
         * parse the template
         * ...........................................................................
         */
        protected _parseElemTemplate(template: IFormElemTemplate<T>): void;
        /**...........................................................................
         * _parseElement
         * ...........................................................................
         * wrapper around the cloning method so we don't run into protection issues
         * ...........................................................................
         */
        protected _parseElement(template: FormElement<any>, appendToID?: string): FormElement<any>;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * creates all elements for this input
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _tableLayout
         * ...........................................................................
         * draws elements in a table format
         * ...........................................................................
         */
        protected _tableLayout(): void;
        /**...........................................................................
         * _flexLayout
         * ...........................................................................
         * handle a flex layout of label: elem
         * ...........................................................................
         */
        protected _flexLayout(): void;
        /**...........................................................................
         * _multiLineLayout
         * ...........................................................................
         * handle a multiline layout of label on top of input
         * ...........................................................................
         */
        protected _multiLineLayout(): void;
        /**...........................................................................
         * _labelAfterLayout
         * ...........................................................................
         * handle displaying the label element after the input
         * ...........................................................................
         */
        protected _labelAfterLayout(): void;
        /**...........................................................................
         * _addStandardElemsToCore
         * ...........................................................................
         *
         * ...........................................................................
         */
        protected _addStandardElemsToCore(): void;
        /**...........................................................................
         * _handleStandardLayout
         * ...........................................................................
         * helper to handle an elements layout based on their config
         * ...........................................................................
         */
        protected _handleStandardLayout(): boolean;
        /**...........................................................................
         * save
         * ...........................................................................
         * handle saving the data from this form
         * @returns The data contained within this form element
         * ...........................................................................
         */
        save<K extends keyof T>(internalUpdate?: boolean): T;
        /**...........................................................................
         * canSave
         * ...........................................................................
         * Determines whether this element has the option for saving
         * @returns True if this element is prepared to save
         * ...........................................................................
         */
        canSave(): ICanSaveTracker;
        /**...........................................................................
         * _hasBlankRequiredElems
         * ...........................................................................
         * Check if this element has any misisng required elements
         * ...........................................................................
         */
        protected _hasBlankRequiredElems(): boolean;
        /** ...........................................................................
         * update
         * ...........................................................................
         * handle when someone gives us new data programmatically
         * @param data - The data to use for this FormElement
         * ...........................................................................
         */
        update(data: T): void;
        /** ...........................................................................
         * render
         * ...........................................................................
         * render a particular form element
         * @param parent - The parent element that should be used to render this element
         * ...........................................................................
         */
        render(parent?: HTMLElement): void;
        /**...........................................................................
         * clear
         * ...........................................................................
         * Clears all data in this particular element
         * ...........................................................................
         */
        clear(): void;
        /**...........................................................................
         * _changeEventFired
         * ...........................................................................
         *
         * ...........................................................................
         */
        protected _changeEventFired(): void;
        /**...........................................................................
         * _clearErrors
         * ...........................................................................
         * clear all of the errors
         * ...........................................................................
         */
        protected _clearErrors(): void;
        /**...........................................................................
         * _validate
         * ...........................................................................
         *  handle the shared validation function
         * ...........................................................................
         */
        protected _validate(data: T, errorString: IErrorString): boolean;
        /**...........................................................................
         * _onValidateError
         * ...........................................................................
         * display a default error message
         * ...........................................................................
         */
        protected _onValidateError(err?: IErrorString): void;
        /**...........................................................................
        * _dispatchSavableChangeEvent
        * ...........................................................................
        * let any listeners know that we updated the savable status of this element
        * ...........................................................................
        */
        protected _dispatchSavableChangeEvent(): void;
        /**...........................................................................
         * _dispatchChangeEvent
         * ...........................................................................
         * let any listeners know that we updated our stuff
         * ...........................................................................
         */
        protected _dispatchChangeEvent(subkey?: string): void;
        /**...........................................................................
         * _handleOtherChange
         * ...........................................................................
         * wrapper around our listener to ensure the data gets parsed appropriately
         * ...........................................................................
         */
        protected _handleOtherChange(ev: Events.Event): void;
        /**...........................................................................
         * _onCreateElements
         * ...........................................................................
         */
        protected abstract _onCreateElements(): void;
        /**...........................................................................
         * _onChange
         * ...........................................................................
         */
        protected abstract _onChange(): boolean;
        /**...........................................................................
         * _createClonedElement
         * ...........................................................................
         * @param   appendToID
         *
         * @returns The cloned form element
         * ...........................................................................
         */
        protected abstract _createClonedElement(appendToID: string): FormElement<T>;
        /**...........................................................................
         * _standardValidation
         * ...........................................................................
         *
         * @param value
         *
         * @returns
         * ...........................................................................
         */
        protected _standardValidation(value: T): boolean;
        /**...........................................................................
         * _createStandardInput
         * ...........................................................................
         *  create a standard input based on the form type
         * ...........................................................................
         */
        protected _createStandardInput(): void;
        /**...........................................................................
         * _createStandardLabel
         * ...........................................................................
         *  create a standard label for the input
         * ...........................................................................
         */
        protected _createStandardLabel(embedIn?: HTMLElement): void;
        /**...........................................................................
         * _createStandardLabeledInput
         * ...........................................................................
         * @param shouldEmbed
         * ...........................................................................
         */
        protected _createStandardLabeledInput(shouldEmbed?: boolean): void;
        /**...........................................................................
         * _onClear
         * ...........................................................................
         *
         * ...........................................................................
         */
        protected _onClear(): void;
    }
}
declare namespace KIP.Forms {
    /**...........................................................................
     * @class CollapsibleElement
     * ...........................................................................
     * Create a collapsible element of the form
     * @version 1.0
     * ...........................................................................
     */
    abstract class CollapsibleElement<T> extends FormElement<T> {
        /** keep track of whether we are currently collapsed */
        protected _isCollapsed: boolean;
        /** keep track of shared elements for collapsible sections */
        protected _elems: {
            core: HTMLElement;
            title: HTMLElement;
            collapseElem?: HTMLElement;
            titleContainer?: HTMLElement;
            childrenContainer: HTMLElement;
        };
        /** style collapsible sections */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /**...........................................................................
         * _createCollapsibleTitle
         * ...........................................................................
         * Create the title for a collapsible section & associated icons
         * ...........................................................................
         */
        protected _createCollapsibleTitle(): void;
        /**...........................................................................
         * _onCaretClicked
         * ...........................................................................
         * Handle the expand/collapse icon being clicked
         * ...........................................................................
         */
        protected _onCaretClicked(): void;
        /**...........................................................................
         * collapse
         * ...........................................................................
         * Handle collapsing the section
         * ...........................................................................
         */
        collapse(): void;
        /**...........................................................................
         * expand
         * ...........................................................................
         * Handle expanding the section
         * ...........................................................................
         */
        expand(): void;
    }
    /**...........................................................................
     * @class SectionElement
     * ...........................................................................
     * create an element in the form that will contain other elements of a form
     * @version 1.0
     * ...........................................................................
     */
    class SectionElement<T extends Object> extends CollapsibleElement<T> {
        /** HTML elements that make up this form */
        protected _elems: {
            core: HTMLElement;
            title: HTMLElement;
            collapseElem?: HTMLElement;
            titleContainer?: HTMLElement;
            childrenContainer: HTMLElement;
        };
        /** styles to display this section correctly */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** section elements are a merged set of themes */
        protected _getUncoloredStyles(): Styles.IStandardStyles;
        /** update the appropriate theme color for the form */
        setThemeColor(idx: number, color: string): void;
        /** also allow child elements that are gracefully created */
        protected _children: IFormElements<T> | FormElement<T>;
        readonly children: IFormElements<T> | FormElement<T>;
        /** handle the defaults that all form elements need */
        protected readonly _defaultCls: string;
        protected readonly _defaultValue: T;
        /** use a section type */
        protected readonly _type: FormElementTypeEnum;
        /**...........................................................................
         * create a section element
         *
         * @param   id          Unique identifier for the section
         * @param   template    Template for the section itself
         * @param   children    All child elements of this section
         *...........................................................................
         */
        constructor(id: string, template: IFormElemTemplate<T> | SectionElement<T>, children?: IFormElements<T> | FormElement<T>);
        /**...........................................................................
         * _onCreateElements
         * ...........................................................................
         * create elements for the section
         * ...........................................................................
         */
        protected _onCreateElements(): void;
        /** create a clone of this element */
        protected _createClonedElement(appendToID: string): SectionElement<T>;
        /**...........................................................................
         * _parseChildren
         * ...........................................................................
         * parse the children array of this form element
         *
         * @param   children    The children for this section
         * ...........................................................................
         */
        protected _parseChildren<K extends keyof T>(children?: IFormElements<T> | FormElement<T>): void;
        /**...........................................................................
         * parseChild
         * ...........................................................................
         * Go through our children array and create the individual children
         *
         * @param   child   The element to parse
         * ...........................................................................
         */
        protected _parseChild(child: FormElement<any>): FormElement<any>;
        /**...........................................................................
         * _updateInternalData
         * ...........................................................................
         * Handle keeping our internal data tracking up to date with our children
         *
         * @param   internalOnly    If true, indicates that we aren't doing a full save
         * ...........................................................................
         */
        protected _updateInternalData<K extends keyof T>(internalOnly?: boolean): void;
        /**...........................................................................
         * save
         * ...........................................................................
         * Handle saving the section
         *
         * @param   internalOnly    If true, doesn't do all the updating that would
         *                          happen on a real save
         *
         * @returns The data contained in this sections child elements
         * ...........................................................................
         */
        save(internalOnly?: boolean): T;
        /**...........................................................................
         * canSave
         * ...........................................................................
         * Determine whether this element can save, based on whether its children
         * have errors.
         *
         * @returns True if we can save this element
         * ...........................................................................
         */
        canSave<K extends keyof T>(): ICanSaveTracker;
        /**...........................................................................
         * _onClear
         * ...........................................................................
         * Clear out all child elements when clearing the section
         * ...........................................................................
         */
        protected _onClear<K extends keyof T>(): void;
        /**...........................................................................
         * update
         * ...........................................................................
         * update the inter contents of the form
         *
         * @param   data    The new data for this element
         * ...........................................................................
         */
        update<K extends keyof T>(data: T): void;
        /**...........................................................................
         * _onChange
         * ...........................................................................
         * no validation for section elements
         * ...........................................................................
         */
        protected _onChange(): boolean;
        addChildElement<K extends keyof T>(key: K, formElem: FormElement<T[K]>): boolean;
    }
    /**...........................................................................
     * @class ArrayElement
     * ...........................................................................
     * Create an element in the form that can be added to
     * @version 1.0
     * ...........................................................................
     */
    class ArrayElement<T> extends CollapsibleElement<T[]> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: T[];
        protected readonly _defaultCls: string;
        protected _data: T[];
        protected static _uncoloredStyles: Styles.IStandardStyles;
        protected _getUncoloredStyles(): Styles.IStandardStyles;
        protected _childTemplate: IFormElements<T> | FormElement<T>;
        readonly childTemplate: IFormElements<T> | FormElement<T>;
        protected _childFormElem: FormElement<T>;
        protected _children: FormElement<T>[];
        protected _elems: {
            core: HTMLElement;
            title: HTMLElement;
            collapseElem?: HTMLElement;
            titleContainer?: HTMLElement;
            childrenContainer: HTMLElement;
            newButton: HTMLElement;
        };
        protected _template: IFormArrayTemplate<T>;
        protected _newLabel: string;
        /** update the appropriate theme color for the form */
        setThemeColor(idx: number, color: string): void;
        constructor(id: string, template: IFormArrayTemplate<T> | ArrayElement<T>, children?: IFormElements<T> | FormElement<T>);
        protected _parseElemTemplate(template: IFormArrayTemplate<T>): void;
        /** create the elements for the array */
        protected _onCreateElements(): void;
        /** create a cloned version of this element */
        protected _createClonedElement(appendToID: string): ArrayElement<T>;
        /** array elements can always change */
        protected _onChange(): boolean;
        /** handle when an external force needs to update the form */
        update(data: T[]): void;
        /** create a new child element in the array */
        protected _createNewChild(): ArrayChildElement<T>;
        protected _updateInternalData(internalOnly?: boolean): void;
        /**...........................................................................
        * save
        * ...........................................................................
        * Handle saving the section
        *
        * @param   internalOnly    If true, doesn't do all the updating that would
        *                          happen on a real save
        *
        * @returns The data contained in this sections child elements
        * ...........................................................................
        */
        save<K extends keyof T>(internalOnly?: boolean): T[];
        /**...........................................................................
         * canSave
         * ...........................................................................
         * Determine whether this element can save, based on whether its children
         * have errors.
         *
         * @returns True if we can save this element
         * ...........................................................................
         */
        canSave<K extends keyof T>(): ICanSaveTracker;
        /** handle clearing out the array */
        protected _onClear(): void;
        onChangeOrder(child: ArrayChildElement<T>, direction: DirectionType, moveTo?: number): void;
    }
    /**
     * Keep track of a child of an array in the form
     * @version 1.0
     */
    class ArrayChildElement<T> extends SectionElement<T> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: T;
        protected readonly _defaultCls: string;
        protected _orderlistener: ArrayElement<T>;
        protected static _uncoloredStyles: Styles.IStandardStyles;
        protected _getUncoloredStyles(): Styles.IStandardStyles;
        protected _elems: {
            core: HTMLElement;
            title: HTMLElement;
            childrenContainer: HTMLElement;
            closeBtn: HTMLElement;
            nextBtn: HTMLElement;
            prevBtn: HTMLElement;
        };
        /** create an element of an array */
        constructor(id: string, children: IFormElements<T> | FormElement<T>);
        protected _onCreateElements(): void;
        protected _createClonedElement(appendToID: string): ArrayChildElement<T>;
        protected _parseElement(child: FormElement<any>): FormElement<any>;
        protected _delete(): void;
        addOrderingListener(orderListener: ArrayElement<T>): void;
        protected _changeOrder(direction: DirectionType): void;
    }
}
declare namespace KIP.Forms {
    /**...........................................................................
     * @class FileUploadElement
     * ...........................................................................
     * handle file uploads such that they return a file list
     * @version 1.0
     * ...........................................................................
     */
    class FileUploadElement extends FormElement<FileList> {
        /** track the type of form element this is */
        protected readonly _type: FormElementTypeEnum;
        /** give this for element a default CSS class */
        protected readonly _defaultCls: string;
        /** set a default value for this form element type */
        protected readonly _defaultValue: FileList;
        /** keep track of the  */
        protected _attr: IAttributes;
        /**...........................................................................
         * Create a FileUploadElement
         *
         * @param   id          The unqiue ID for the element
         * @param   template    The template element to use as a basis for this element
         * ...........................................................................
         */
        constructor(id: string, template: IFormFileElemTemplate<FileList> | FileUploadElement);
        /**...........................................................................
         * _parseElemTemplate
         * ...........................................................................
         *
         * @param template
         * ...........................................................................
         */
        protected _parseElemTemplate(template: IFormFileElemTemplate<FileList>): void;
        /**...........................................................................
         * _onCreateElements
         * ...........................................................................
         * Handle create elements
         * ...........................................................................
         */
        protected _onCreateElements(): void;
        /**...........................................................................
         * _onChange
         * ...........................................................................
         * Handle when the user has uploaded a file
         *
         * @returns True if the file passes validation
         * ...........................................................................
         */
        protected _onChange(): boolean;
        /**...........................................................................
         * _createClonedElement
         * ...........................................................................
         * Handle cloning this element
         *
         * @param   appendToId  The ID to append to the cloned element
         *
         * @returns The created cloned element
         * ...........................................................................
         */
        protected _createClonedElement(appendToId: string): FileUploadElement;
    }
    /**...........................................................................
     * @class FilePathElement
     * ...........................................................................
     * handle a file-upload field that supports just a file path
     * @version 1.0
     * ...........................................................................
     */
    class FilePathElement extends FormElement<string> {
        /** style elements for the file path */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** select the appropriate type for the file path type */
        protected readonly _type: FormElementTypeEnum;
        /** set a default class for file-path elements */
        protected readonly _defaultCls: string;
        /** set a default value for file-path elements */
        protected readonly _defaultValue: string;
        protected _onSaveCallback: IFileSaveCallback;
        protected _onChangeCallback: IFileChangeCallback;
        protected _files: FileList;
        protected _attr: IAttributes;
        protected _tempLink: string;
        protected _elems: {
            core: HTMLElement;
            input: HTMLInputElement;
            inputLabel?: HTMLElement;
            inputContainer?: HTMLElement;
            label?: HTMLElement;
            error: HTMLElement;
            display: HTMLElement;
        };
        /**...........................................................................
         * Create the file path element
         *
         * @param   id          Unique ID for this element
         * @param   template    Template to use to create this element
         * ...........................................................................
         */
        constructor(id: string, template: IFormFilePathElemTemplate | FilePathElement);
        /**...........................................................................
         * _parseElemTemplate
         * ...........................................................................
         * Handle creating this element off of a template
         *
         * @param   template
         * ...........................................................................
         */
        protected _parseElemTemplate(template: IFormFilePathElemTemplate): void;
        protected _onCreateElements(): void;
        /**...........................................................................
         * _onChange
         * ...........................................................................
         * handle when the data in this element changes
         * ...........................................................................
         */
        protected _onChange(): boolean;
        protected _onLinkChange(): boolean;
        update(data: string): void;
        save(internalOnly?: boolean): string;
        protected _createClonedElement(appendToID: string): FilePathElement;
    }
    /**...........................................................................
     * @class PhotoPathElement
     * ...........................................................................
     * create an element to upload photos
     * @version 1.0
     * ...........................................................................
     */
    class PhotoPathElement extends FilePathElement {
        /** style the elements for this form element */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** default class for this element */
        protected readonly _defaultCls: string;
        /** keep track of the elements needed for this element */
        protected _elems: {
            core: HTMLElement;
            photoWrapper: HTMLElement;
            display: HTMLImageElement;
            overlay: HTMLElement;
            linkBtn: HTMLElement;
            uploadBtn: HTMLElement;
            input: HTMLInputElement;
            error: HTMLElement;
        };
        /**...........................................................................
         * _onCreateElements
         * ...........................................................................
         * Handle creating elements for the form element
         * ...........................................................................
         */
        protected _onCreateElements(): void;
        /**...........................................................................
         * _createClonedElement
         * ...........................................................................
         * Handle cloning this element
         *
         * @param   appendToID  If provided, the ID to append to this element
         *
         * @returns The created cloned element
         * ...........................................................................
         */
        protected _createClonedElement(appendToID: string): PhotoPathElement;
        /**...........................................................................
         * update
         * ...........................................................................
         * @param data
         * ...........................................................................
         */
        update(data: string): void;
        /**...........................................................................
         * _onFileSelected
         * ...........................................................................
         *
         * ...........................................................................
         */
        protected _onFileSelected(): void;
        /**...........................................................................
         * _onLinkChange
         * ...........................................................................
         *
         * ...........................................................................
         */
        protected _onLinkChange(): boolean;
        /**...........................................................................
         * _onClear
         * ...........................................................................
         *
         * ...........................................................................
         */
        protected _onClear(): void;
    }
}
declare namespace KIP.Forms {
    interface IFormElems extends IDrawableElements {
        base: HTMLElement;
        overlay?: HTMLElement;
        background?: HTMLElement;
        formContent?: HTMLElement;
        buttons?: HTMLElement;
        saveButton?: HTMLElement;
        cancelButton?: HTMLElement;
        closeButton?: HTMLElement;
    }
    /**
     * create a form with a data structure of F
     * @version 1.0
     */
    class Form<F> extends Drawable {
        /** handle standard styles for the form */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** get the appropriate data out of this form */
        readonly data: F;
        /** internal tracking for whether the form is showing or not */
        protected _hidden: boolean;
        /** true if this is a popup form rather than an inline form */
        protected _showAsPopup: boolean;
        /** true if we should skip our standard styles */
        protected _noStandardStyles: boolean;
        /** unique ID for the form */
        protected _id: string;
        /** keep track pf the elements in this form */
        protected _elems: IFormElems;
        /** the drawable element containing all other form elements */
        protected _coreFormElem: SectionElement<F>;
        /** any listeners that should be used upon the form saving */
        protected _saveListeners: Collection<IFormSaveFunction>;
        /** any listeners that should be used upon the form canceling */
        protected _cancelListeners: Collection<IFormCancelFunction>;
        /** any additional buttons that should show in the form */
        protected _additionalButtons: IFormButton[];
        /** keep track of whether there are changes in this form */
        protected _hasChanges: boolean;
        /** keep track of whether we can save this form */
        protected _canSaveTracker: ICanSaveTracker;
        /**...........................................................................
         * Form
         * ...........................................................................
         * Create the Form
         *
         * @param   id          Unique ID for the form
         * @param   options     Specific way this form should be created
         * @param   elems       Form elements that should be shown for this form
         * ...........................................................................
         */
        constructor(id: string, options: IFormOptions, elems?: IFormElements<F>);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements used by the form
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _createPopupElements
         * ...........................................................................
         * create the elements needed for the popup version of the form
         * ...........................................................................
         */
        protected _createPopupElements(): void;
        /**...........................................................................
         * _createButtons
         * ...........................................................................
         * create the appropriate buttons for the form
         * ...........................................................................
         */
        protected _createButtons(): void;
        /**...........................................................................
         * _createCoreElem
         * ...........................................................................
         * create the core section that will display all of our data
         *
         * @param   options     the options that are passed in for the general form
         * @param   elems       Elements associated with this form
         * ...........................................................................
         */
        protected _createCoreElem(options: IFormOptions, elems: IFormElements<F>): void;
        protected _addSaveButtonUpdater(): void;
        /**...........................................................................
         * save
         * ...........................................................................
         * Saves data in the form
         *
         * @returns The data contained in the form
         * ...........................................................................
         */
        protected _save(): F;
        /**...........................................................................
         * trySave
         * ...........................................................................
         * Attempt to save the form
         * ...........................................................................
         */
        trySave(): F;
        /**...........................................................................
         * _canSave
         * ...........................................................................
         * Check with our elements that we are able to save
         * ...........................................................................
         */
        protected _canSave(): boolean;
        /**...........................................................................
         * _showCannotSaveMessage
         * ...........................................................................
         * Show popup indicating why we couldn't save this form
         * ...........................................................................
         */
        protected _showCannotSaveMessage(): void;
        /**...........................................................................
         * _getCannotSaveMessage
         * ...........................................................................
         * Determine what message to show as to why the form cannot be saved
         * ...........................................................................
         */
        protected _getCannotSaveMessage(): string;
        /**...........................................................................
         * _notifySaveListeners
         * ...........................................................................
         * lets all listeners know that the form has saved
         *
         * @param  data    The form data that was just saved
         * ...........................................................................
         */
        protected _notifySaveListeners(data: F): void;
        /**...........................................................................
         * _cancelConfirmation
         * ...........................................................................
         * Handle informing the user that they have unsaved changes before cancelling
         * ...........................................................................
         */
        protected _cancelConfirmation(): void;
        /**...........................................................................
         * _cancel
         * ...........................................................................
         * Cancel the form and any changes within it
         * ...........................................................................
         */
        protected _cancel(): void;
        tryCancel(ignoreUnsavedChanges?: boolean): boolean;
        /**...........................................................................
         * _notifyCancelListeners
         * ...........................................................................
         * lets all listeners know that the form has been canceled
         *
         * @param   hasChanges  True if the form has been changed since initialization
         * ...........................................................................
         */
        protected _notifyCancelListeners(hasChanges: boolean): void;
        /**...........................................................................
         * clear
         * ...........................................................................
         * clears all data out of the form
         * ...........................................................................
         */
        clear(): void;
        /**...........................................................................
         * update
         * ...........................................................................
         * update the data in the form to match a particular data set
         *
         * @param   data    The data to update the form with
         * ...........................................................................
         */
        update(data: F): void;
        undo(): void;
        redo(): void;
        protected _trackChanges(): void;
        /**...........................................................................
         * show
         * ...........................................................................
         * show the form on the appropriate parent
         * ...........................................................................
         */
        show(): void;
        /**...........................................................................
         * hide
         * ...........................................................................
         * hide the form
         * ...........................................................................
         */
        hide(): void;
        /**...........................................................................
         * draw
         * ...........................................................................
         * Draw the form element on whatever parent is specified
         * (defaults to document.body)
         *
         * @param   parent  The element to add to
         * @param   noShow  If true, doesn't show the form as a oart of this draw
         * ...........................................................................
         */
        draw(parent: HTMLElement, noShow?: boolean): void;
        /**...........................................................................
         * registerSaveListener
         * ...........................................................................
         * register any listener that wants to hear about this form saving
         *
         * @param   listener    The function to call when the form is saved
         *
         * @returns The key with which the event is registered
         * ...........................................................................
         */
        registerSaveListener(listener: IFormSaveFunction): string;
        /**...........................................................................
         * registerCancelListener
         * ...........................................................................
         * registers any listener that wants to hear about this form canceling
         *
         * @param   listener       The function to call when the form is cancelled
         *
         * @returns The key with which the event is registered
         * ...........................................................................
         */
        registerCancelListener(listener: IFormCancelFunction): string;
        protected _addWindowEventListeners(): void;
        protected addFormElement<K extends keyof F>(key: K, formElem: FormElement<F[K]>): boolean;
    }
    const FORM_ELEM_CHANGE = "formelemchange";
    const FORM_SAVABLE_CHANGE = "formsavablechange";
}
declare namespace KIP.Forms {
    function cloneTemplate<D>(template: IFormElemTemplate<D>): IFormElemTemplate<D>;
    /**
     * Creates a select element with associated options
     * @param id - ID to use for the select element
     * @param cls - the CSS class to use to style this select box
     * @param options - What options should be included in the select box
     * @param defaultSelection - What should be selected by default
     */
    function createSelectElement(id: string, cls: string, options: ISelectOptions, defaultSelection?: string): HTMLSelectElement;
    interface ICheckboxElems {
        wrapper: HTMLElement;
        checkbox: HTMLInputElement;
    }
    /**
     * Creates a checkbox element & a wrapper around it
     * @param id - ID to use for the checkbox
     * @param cls - the CSS class to style this checkbox
     * @param lbl - What label to use for this checkbox
     * @param checked - True if the checkbox should be checked
     */
    function createLabeledCheckbox(id: string, cls?: string, lbl?: string, checked?: boolean): ICheckboxElems;
    /** creates a label that will be clickable to select an associated input */
    function createLabelForInput(lbl: string, labelFor: string, cls?: string, embedIn?: HTMLElement): HTMLLabelElement;
    function createRadioButtons(): void;
    /**
     * Create an input element
     * @param id
     * @param cls
     * @param type
     * @param value
     * @param attr
     * @param children
     * @param parent
     */
    function createInputElement(id: string, cls: string, type: string, value?: any, attr?: IAttributes, children?: IChildren, parent?: HTMLElement): HTMLInputElement;
}
declare namespace KIP.Forms {
    /**...........................................................................
     * @class CheckElement
     * ...........................................................................
     * create a checkbox form element
     * @version 1.0
     * ...........................................................................
     */
    class CheckElement extends FormElement<boolean> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: boolean;
        protected readonly _defaultCls: string;
        protected readonly _layout: FormElementLayoutEnum;
        protected _elems: {
            core: HTMLElement;
            error?: HTMLElement;
            lbl?: HTMLElement;
            input?: HTMLInputElement;
            inputBox?: HTMLElement;
            inputInnerBox?: HTMLElement;
            innerLbl?: HTMLElement;
        };
        protected static _uncoloredStyles: Styles.IStandardStyles;
        protected _getUncoloredStyles(): Styles.IStandardStyles;
        /** create the check elements */
        protected _onCreateElements(): void;
        /** handle when the checkbox is clicked */
        protected _onChange(): boolean;
        /** clone the appropriate element */
        protected _createClonedElement(appendToID: string): CheckElement;
        /** update the contents of the element */
        update(data: boolean): void;
    }
    /**...........................................................................
     * @class TextElement
     * ...........................................................................
     * create a text element for a form
     * @version 1.0
     * ...........................................................................
     */
    class TextElement extends FormElement<string> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: string;
        protected readonly _defaultCls: string;
        protected _onCreateElements(): void;
        protected _onChange(): boolean;
        protected _createClonedElement(appendToID: string): TextElement;
    }
    /**...........................................................................
     * @class TextAreaElement
     * ...........................................................................
     * create a text area element for a form
     * @version 1.0
     * ...........................................................................
     */
    class TextAreaElement extends FormElement<string> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: string;
        protected readonly _defaultCls: string;
        protected _onCreateElements(): void;
        protected _onChange(): boolean;
        protected _createClonedElement(appendToID: string): TextAreaElement;
        update(data: string): void;
    }
    /**...........................................................................
     * @class DateElement
     * ...........................................................................
     * create a date element for a form
     * @version 1.0
     * ...........................................................................
     */
    class DateElement extends FormElement<Date> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: Date;
        protected readonly _defaultCls: string;
        /** create the display for the date element */
        protected _onCreateElements(): void;
        protected _onChange(): boolean;
        protected _createClonedElement(appendToID: string): DateElement;
        update(data: Date): void;
    }
    /**...........................................................................
     * @class TimeElement
     * ...........................................................................
     * create a time element for a form
     * @version 1.0
     * ...........................................................................
     */
    class TimeElement extends FormElement<Date> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: Date;
        protected readonly _defaultCls: string;
        protected _onCreateElements(): void;
        protected _onChange(): boolean;
        protected _createClonedElement(appendToID: string): TimeElement;
        update(data: Date): void;
    }
    /**...........................................................................
     * @class DateTimeElement
     * ...........................................................................
     * create an element to collect date and time for a form
     * @version 1.0
     * ...........................................................................
     */
    class DateTimeElement extends FormElement<Date> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: Date;
        protected readonly _defaultCls: string;
        protected static _uncoloredStyles: Styles.IStandardStyles;
        protected _elems: {
            core: HTMLElement;
            label: HTMLElement;
            inputWrapper: HTMLElement;
            timeInput: HTMLInputElement;
            dateInput: HTMLInputElement;
        };
        protected _onCreateElements(): void;
        protected _onChange(): boolean;
        protected _createClonedElement(appendToID: string): DateTimeElement;
        update(data: Date): void;
    }
    /**...........................................................................
     * @class SelectElement
     * ...........................................................................
     * create a dropdown for a form
     * @version 1.0
     * ...........................................................................
     */
    class SelectElement extends FormElement<number> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: number;
        protected readonly _defaultCls: string;
        protected _options: ISelectOptions;
        protected _elems: {
            core: HTMLElement;
            input: HTMLSelectElement;
            lbl: HTMLElement;
        };
        /** create the select element */
        constructor(id: string, template: IFormSelectTemplate | SelectElement);
        /** handle cloning an additional element */
        protected _cloneFromFormElement(data: SelectElement): void;
        protected _parseElemTemplate(template: IFormSelectTemplate): void;
        protected _onCreateElements(): void;
        protected _onChange(): boolean;
        protected _createClonedElement(appendToID: string): SelectElement;
    }
    /**...........................................................................
     * @class NumberElement
     * ...........................................................................
     * create a number element for a form
     * @version 1.0
     * ...........................................................................
     */
    class NumberElement extends FormElement<number> {
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultValue: number;
        protected readonly _defaultCls: string;
        protected _onCreateElements(): void;
        protected _onChange(): boolean;
        protected _createClonedElement(appendToID: string): NumberElement;
    }
    /**...........................................................................
     * @class   ColorElement
     * ...........................................................................
     * Creates a form element for collecting colors
     * @version 18.2.25
     * @author  Kip Price
     * ...........................................................................
     */
    class ColorElement extends FormElement<string> {
        /** type of element */
        protected readonly _type: FormElementTypeEnum;
        /** default value to use */
        protected readonly _defaultValue: string;
        /** default CSS class to use */
        protected readonly _defaultCls: string;
        /**...........................................................................
         * _onCreateElements
         * ...........................................................................
         * Create elements for this form element
         * ...........................................................................
         */
        protected _onCreateElements(): void;
        /**...........................................................................
         * _onChange
         * ...........................................................................
         * Handle the change event for this input
         * ...........................................................................
         */
        protected _onChange(): boolean;
        /**...........................................................................
         * _createClonedElement
         * ...........................................................................
         * Clone this element
         * @param   appendToID  Additional ID piece to use
         * ...........................................................................
         */
        protected _createClonedElement(appendToID: string): ColorElement;
    }
    /**...........................................................................
     * @class HiddenElement
     * ...........................................................................
     * handle a data element that will be set, but not displayed to the user
     * @version 1.0
     * ...........................................................................
     */
    class HiddenElement<T> extends FormElement<T> {
        protected static _uncoloredStyles: Styles.IStandardStyles;
        protected readonly _type: FormElementTypeEnum;
        protected readonly _defaultCls: string;
        protected readonly _defaultValue: T;
        protected _onCreateElements(): void;
        protected _onChange(): boolean;
        protected _createClonedElement(appendToID: string): HiddenElement<T>;
        save(): T;
    }
}
declare namespace KIP.Forms {
    interface IToggleButtonElem<T> {
        key: T;
        btn: HTMLElement;
    }
    /**...........................................................................
     * @class   ToggleButtonElement
     * ...........................................................................
     * template for toggle buttons
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    abstract class ToggleButtonElement<T> extends FormElement<T> {
        /** the button options toggle button type */
        protected _options: IToggleBtnOption<any>[];
        /** handle whether this is a multi-select function */
        protected _multiSelect: boolean;
        /** keep track of our buttons */
        protected _buttons: IToggleButtonElem<T>[];
        /** type for the toggle buttons */
        protected readonly _type: FormElementTypeEnum;
        /** default class for the toggle buttons */
        protected readonly _defaultCls: string;
        /** static styles for the toggle buttons */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * Create a toggle button class
         * @param   id          The ID to use for the toggle button
         * @param   template    The template for this element
         * ...........................................................................
         */
        constructor(id: string, template: IFormToggleButtonTemplate<any> | ToggleButtonElement<any>);
        /**...........................................................................
         * _parseElemTemplate
         * ...........................................................................
         * Parse data in the element template
         * @param   template    Handle the element
         * ...........................................................................
         */
        protected _parseElemTemplate(template: IFormToggleButtonTemplate<any>): void;
        /**...........................................................................
         * _cloneFromFormElement
         * ...........................................................................
         * handle cloning an additional element
         * @param   data    The form element to clone from
         * ...........................................................................
         */
        protected _cloneFromFormElement(data: ToggleButtonElement<T>): void;
        /**...........................................................................
         * _onCreateElements
         * ...........................................................................
         * create the elements needed for toggle buttons
         * ...........................................................................
         */
        protected _onCreateElements(): void;
        /**...........................................................................
         * _createOptionsElements
         * ...........................................................................
         *
         * ...........................................................................
         */
        protected _createOptionsElements(): void;
        /**...........................................................................
         * _createOptionElement
         * ...........................................................................
         * @param elem
         * ...........................................................................
         */
        protected _createOptionElement(elem: IToggleBtnOption<any>): HTMLElement;
        /**...........................................................................
         * _onChange
         * ...........................................................................
         *
         * ...........................................................................
         */
        protected _onChange(): boolean;
        /**...........................................................................
         * update
         * ...........................................................................
         * @param data
         * ...........................................................................
         */
        update(data: T): void;
        protected _getButtonToUpdate(data: any): HTMLElement;
        _onClear(): void;
        protected abstract _selectBtn(btn: HTMLElement, value: any): void;
        protected abstract _shouldBeSelected(elem: IToggleBtnOption<any>): boolean;
    }
    /**...........................................................................
     * @class   SingleSelectButtonElem
     * ...........................................................................
     * toggle buttons as equivalent to radio buttons
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class SingleSelectButtonElem<T> extends ToggleButtonElement<T> {
        protected _selectedBtn: HTMLElement;
        protected _options: IToggleBtnOption<T>[];
        protected readonly _defaultValue: T;
        protected readonly _multiSelect: boolean;
        constructor(id: string, template: IFormSingleSelectButtonTemplate<T> | SingleSelectButtonElem<T>);
        protected _parseElemTemplate(template: IFormSingleSelectButtonTemplate<T>): void;
        /** handle a button being selected */
        protected _selectBtn(btn: HTMLElement, value: T): void;
        protected _createClonedElement(appendToID: string): SingleSelectButtonElem<T>;
        protected _shouldBeSelected(elem: IToggleBtnOption<T>): boolean;
        _onClear(): void;
        setThemeColor(idx: number, color: string, noReplace?: boolean): void;
    }
    /**...........................................................................
     * @class   MultiSelectButtonElem
     * ...........................................................................
     * toggle buttons as multi-select options
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class MultiSelectButtonElem<T> extends ToggleButtonElement<T[]> {
        protected _selectedBtns: HTMLElement[];
        protected readonly _multiSelect: boolean;
        protected readonly _defaultValue: T[];
        protected _options: IToggleBtnOption<T>[];
        /**...........................................................................
         * Create the multi select form
         * @param id
         * @param template
         * ...........................................................................
         */
        constructor(id: string, template: IFormMultiSelectButtonTemplate<T> | MultiSelectButtonElem<T>);
        /**...........................................................................
         * _parseElemTemplate
         * ...........................................................................
         * @param template
         * ...........................................................................
         */
        protected _parseElemTemplate(template: IFormMultiSelectButtonTemplate<T>): void;
        /**...........................................................................
         * update
         * ...........................................................................
         * @param data
         * ...........................................................................
         */
        update(data: T[]): void;
        /**...........................................................................
         * _shouldBeSelected
         * ...........................................................................
         * @param   elem    The element to potentially select
         * @returns True if a specified button should be selected
         * ...........................................................................
         */
        protected _shouldBeSelected(elem: IToggleBtnOption<T>): boolean;
        /**...........................................................................
         * _createClonedElement
         * ...........................................................................
         * @param appendToID
         * ...........................................................................
         */
        protected _createClonedElement(appendToID: string): MultiSelectButtonElem<T>;
        /**...........................................................................
         * _selectBtn
         * ...........................................................................
         * @param btn
         * @param value
         * ...........................................................................
         */
        protected _selectBtn(btn: HTMLElement, value: T): void;
        /**...........................................................................
         * _indexOf
         * ...........................................................................
         * @param value
         * @returns The index of the element in the array, or -1 if it isn't found
         * ...........................................................................
         */
        protected _indexOf(value: T): number;
        /**...........................................................................
         * _equalTo
         * ...........................................................................
         * Determine whether the data in this element is equivalent t
         * @param dataA
         * @param dataB
         * ...........................................................................
         */
        protected _equalTo(dataA: T, dataB: T): boolean;
        /**...........................................................................
         * _onClear
         * ...........................................................................
         * Handle clearing data from this element
         * ...........................................................................
         */
        _onClear(): void;
    }
}
declare namespace KIP {
    enum FormStandardButtons {
        OK = 1,
        Accept = 2,
        Cancel = 3,
        Next = 4,
        Previous = 5,
        Custom = 99,
    }
    enum FieldTypeEnum {
        Text = 0,
        Date = 1,
        Numeric = 2,
        Range = 3,
        Color = 4,
        TextArea = 5,
        Checkbox = 6,
        Radio = 7,
        Select = 8,
    }
    interface IFormButtonDefinition {
        lbl: string;
        onClick: Function;
    }
    interface IFormConfiguration {
        id: string;
        title: string;
        buttons?: FormStandardButtons[];
        saveCb: IFormSaveFunction;
        options?: IFormOptions;
        fields?: IFormDefinition;
    }
    interface IFormOptions {
        useStandardStyles?: boolean;
        themeColor?: string;
    }
    interface IFormSaveFunction {
        (data: IFormData): void;
    }
    interface IFormCancelFunction {
        (dataChanged: boolean): void;
    }
    interface IFormData {
        [key: string]: any;
    }
    interface IFormDefinition {
        [key: string]: IFormFieldDefinition;
    }
    interface IFormFieldDefinition {
        id: string;
        type: FieldTypeEnum;
        lbl?: string;
        default?: any;
        placeholder?: any;
        options?: ISelectOption[];
    }
    interface ISelectOption {
        value: any;
        lbl: string;
    }
    interface IFormField {
        definition: IFormFieldDefinition;
        id: string;
        inputElem: HTMLInputElement;
        lblElem: HTMLElement;
        data?: any;
    }
}
declare namespace KIP.SVG {
    /**...........................................................................
     * @class ISVGOptions
     * ...........................................................................
     * Interface for all options that apply to SVG Drawables
     * ...........................................................................
     */
    interface ISVGOptions {
        /** how big the svg element should be padded */
        gutter?: number;
        /** whether we should resize the SVG canvas to the viewport */
        auto_resize?: boolean;
        /** how much we should zoom horizontally */
        zoom_x?: number;
        /** how much we should zoom vertically */
        zoom_y?: number;
        /** how much we should move horizontally */
        pan_x?: boolean;
        /** how much we should move vertically */
        pan_y?: boolean;
        /** true if we should ignore events like pan/zoom on the canvas */
        prevent_events?: boolean;
    }
    /**...........................................................................
     * @class 	SVGDrawable
     * ...........................................................................
     * Create a drawable SVG canvas
     * @version 1.1
     * @author	Kip Price
     * ...........................................................................
     */
    class SVGDrawable extends Drawable {
        protected static _lastId: number;
        protected static readonly _nextId: string;
        /** The base element of the SVG canvas */
        base: SVGElement;
        /** Definitions for the SVG canvas */
        private _definitionsElement;
        /** gradients available in this canvas */
        private __gradients;
        /** The rectangle that defines the bounds of the canvas */
        private _view;
        readonly view: IBasicRect;
        /** The maximum and minimum values of the SVG canvas */
        private _extrema;
        /** All elements that are drawn in the canvas */
        protected _svgElems: Collection<SVGElement>;
        protected _nonScaled: SVGElement[];
        /** Any options that should be used for this canvas */
        private _options;
        /** The bounds of the SVG element in the actual window */
        private _bounds;
        /** The path that is currently being drawn in the canvas */
        private _currentPath;
        /** styles for the SVG element */
        private _style;
        readonly style: SVGStyle;
        private _elemCollections;
        /**...........................................................................
         * Constructs a basic SVG canvas
         * @param 	id     The ID of the canvas
         * @param 	bounds The real-world (e.g. in window) bounds of the canvas
         * @param 	opts   Any options that should be applied to the canvas
         * ...........................................................................
         */
        constructor(id?: string, bounds?: IBasicRect, opts?: ISVGOptions);
        /**...........................................................................
         * _initializeInternalSizing
         * ...........................................................................
         * Make sure we have default values for extrema
         * ...........................................................................
         */
        private _initializeInternalSizing();
        /**...........................................................................
         * _createDefaultOptions
         * ...........................................................................
         * Get the set of default options
         * @returns	The created default options
         * ...........................................................................
         */
        private _createDefaultOptions();
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements needed for this SVG drawable
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _addEventListeners
         * ...........................................................................
         * Adds the relevant event listeners for the SVG object
         * ...........................................................................
         */
        private _addEventListeners();
        /**...........................................................................
         * _onZoom
         * ...........................................................................
         * handle zooming in & out
         * @param	direction	If positive, zooms in. If negative, zooms out
         * ...........................................................................
         */
        protected _onZoom(direction: number): void;
        /**...........................................................................
         * _onPan
         * ...........................................................................
         * handle panning the SVG canvas
         * @param	delta	The amount to pan by
         * ...........................................................................
         */
        protected _onPan(delta: IPoint): void;
        /**...........................................................................
         * Sets the real-world width of the canvas
         * @param 	w 	The width to set
         * ...........................................................................
         */
        width: number;
        /**...........................................................................
         * Sets the real-world height of the canvas
         * @param 	h 	The height to set
         * ...........................................................................
         */
        height: number;
        /**...........................................................................
         * generateViewboxAttribute
         * ...........................................................................
         * Create a string that can be used in the viewbox attribute for the SVG
         * @param  	set		True if we should also set the attribute after generating it
         * @returns The viewbox attribute for the current view
         * ...........................................................................
         */
        generateViewboxAttribute(set?: boolean): string;
        /**...........................................................................
         * _calculateView
         * ...........................................................................
         * Calculate what the view of the SVG should be, based on the extrema
         * @returns True if the extrema were appropriately calculated
         * ...........................................................................
         */
        protected _calculateView(): boolean;
        /**...........................................................................
         * _updateExtrema
         * ...........................................................................
         * Updates the extreme points of this SVG element after adding an element
         * @param 	extrema 	The extrema of the element just added
         * ...........................................................................
         */
        private _updateExtrema(extrema);
        /**...........................................................................
         * calculateSVGCoordinates
         * ...........................................................................
         * Calculates the SVG coordinates from real coordinates
         * @param   pt	The real coordinates to convert
         * @returns The SVG coordinates for this real point
         * ...........................................................................
         */
        calculateSVGCoordinates(pt: IPoint): IPoint;
        /**...........................................................................
         * calculateScreenCoordinates
         * ...........................................................................
         * Calculate the real coordinates from SVG coordinates
         * @param 	pt 	The point to convert to real coordinates
         * @returns	The real coordinates for this SVG point
         * ...........................................................................
         */
        calculateScreenCoordinates(pt: IPoint): IPoint;
        /**...........................................................................
         * _convertCoordinates
         * ...........................................................................
         *
         * ...........................................................................
         */
        private _convertCoordinates(pt, numerator, denominator);
        private _convertDistance(measure, numerator, denominator);
        calculateSVGWidth(width: number): number;
        calculateSVGHeight(height: number): number;
        calculateScreenWidth(width: number): number;
        calculateScreenHeight(height: number): number;
        /**...........................................................................
         * _addChild
         * ...........................................................................
         * @param 	type
         * @param 	attributes
         * @param 	parentGroup
         * @returns	The created SVG element
         * ...........................................................................
         */
        private _addChild(type, attributes?, parentGroup?);
        private _initializeAttributes(attr, group?);
        private _addChildElement(elem);
        /**
         * Adds a path to the SVG canvas
         * @param   {IPathPoint[]} points   The points to add to the path
         * @param   {IAttributes}  attr     Any attributes that should be applied
         * @param   {SVGElement}   group    The group this path should be added to
         * @param   {boolean}      noFinish True if we should finish the path without closing
         * @returns {SVGElement}            The path that was created
         */
        addPath(points: IPathPoint[], attr?: IPathSVGAttributes, group?: SVGElement, noFinish?: boolean): SVGElement;
        /**...........................................................................
         * addRectangle
         * ...........................................................................
         * @param x
         * @param y
         * @param width
         * @param height
         * @param attr
         * @param group
         * ...........................................................................
         */
        addRectangle(x: number, y: number, width: number, height: number, attr?: ISVGAttributes, group?: SVGElement): SVGElement;
        /**...........................................................................
         * addCircle
         * ...........................................................................
         * adds a circle to the SVG canvas
         * @param	centerPt
         * @param	radius
         * @param	attr
         * @param	group
         * @returns	The created circle
         * ...........................................................................
         */
        addCircle(centerPt: IPoint, radius: number, attr?: IAttributes, group?: SVGElement): SVGElement;
        /**...........................................................................
         * regularPolygon
         * ...........................................................................
         * creates a regular polygon to the SVG canvas
         * @param   centerPt The central point of the polygon
         * @param   sides    The number of sides of the polygon
         * @param   radius   The radius of the polygon
         * @param   attr     Any additional attributes
         * @param   group    The group the polygon should be added to
         * @returns The created polygon on the SVG Canvas
         * ...........................................................................
         */
        regularPolygon(centerPt: IPoint, sides: number, radius: number, attr?: IPathSVGAttributes, group?: SVGElement): SVGElement;
        /**...........................................................................
         * addRegularStar
         * ...........................................................................
         * Creates a regular star on the SVG canvas
         * @param   centerPt      	The point at the center of the star
         * @param   numberOfPoints 	The number of points of this star
         * @param   radius        	[description]
         * @param   innerRadius   	[description]
         * @param   attr          	[description]
         * @param   group         	[description]
         * @returns The created star
         * ...........................................................................
         */
        addRegularStar(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number, attr?: IPathSVGAttributes, group?: SVGElement): SVGElement;
        /**...........................................................................
         * addtext
         * ...........................................................................
         * Adds a text element to the SVG canvas
         * @param   text     The text to add
         * @param   point    The point at which to add the point
         * @param   originPt If provided, the origin point within the text element that defines where the text is drawn
         * @param   attr     Any attributes that should be applied to the element
         * @param   group    The group to add this element to
         * @returns The text element added to the SVG
         * ...........................................................................
         */
        addText(text: string, point: IPoint, originPt: IPoint, attr: IAttributes, group: SVGElement): SVGElement;
        addFlowableText(text: string, bounds: IBasicRect, attr: IAttributes, group: SVGElement): SVGElement;
        /**...........................................................................
         * addGroup
         * ...........................................................................
         * @param	attr
         * @param 	group
         * @returns	The created element
         * ...........................................................................
         */
        addGroup(attr?: IAttributes, group?: SVGElement): SVGElement;
        /**...........................................................................
         * addGradient
         * ...........................................................................
         * Adds a gradient to the SVG canvas
         * @param   type       The type of gradient to add
         * @param   points     What points describe the gradient
         * @param   transforms 	 ???
         * @returns he created gradient
         * ...........................................................................
         */
        addGradient(type: SVGGradientTypeEnum, points: IGradientPoint[], transforms: {
            start: IPoint;
            end: IPoint;
        }): string;
        /**
         * Adds a particular shape to the SVG canvas
         * @param   shapeType The type of shape to add
         * @param   scale     What scale the shape should be drawn at
         * @param   attr      Any attributes that should be applied to the element
         * @param   group     What group the element should be added to
         * @returns The created shape
         */
        addShape(shapeType: SVGShapeEnum, scale?: number, attr?: IAttributes, group?: SVGElement): SVGElement;
        /**
         * Adds a checkmark to the canvas with the provided scale
         */
        private _addCheckShape(scale, attr?, group?);
        /**
         * Adds an 'ex' to the canvas with the provided scale
         */
        private _addExShape(scale, attr?, group?);
        /**
         * Adds a plus to the canvas with the provided scale
         */
        private _addPlusShape(scale, attr?, group?);
        /**...........................................................................
         * _convertPointsToPathPoints
         * ...........................................................................
         * Helper function to turn an array of IPoint elements to IPathPoint elements
         * @param   points 	The points to convert
         * @param   scale  	The scale that should be applied to the IPoint before turning into a IPathPoint
         * @returns Array of scaled IPathPoints
         * ...........................................................................
         */
        private _convertPointsToPathPoints(points, scale?);
        assignStyle(element: SVGElement): void;
        /**...........................................................................
         * rotateElement
         * ...........................................................................
         * Rotates an element around a particular point
         * @param   elem         The element to rotate
         * @param   degree       How many degrees to rotate the element
         * @param   rotateAround What point to rotate around
         * @returns The rotated SVG Element
         * ...........................................................................
         */
        rotateElement(elem: SVGElement, degree: number, rotateAround?: IPoint): SVGElement;
        animateElement(): void;
        /**...........................................................................
         * measureElement
         * ...........................................................................
         * Measures an element in the SVG canvas
         * @param   element 	The element to measure
         * @returns The dimensions of the element, in SVG coordinates
         * ...........................................................................
         */
        measureElement(element: SVGElement): IBasicRect;
        /**
         * _saveOriginalView
         */
        protected _saveOriginalView: () => void;
    }
}
declare namespace KIP.Old {
    interface IDictionary<T> {
        [key: string]: T;
    }
    /**
     * Creates a view of a project in a Gantt Chart
     * @class ProjectWindow
     * @param {string} name - The name & ID of the project
     * @param {Date} start - The date at which the default viewing window should start. Can be a date string or a Date object
     * @param {Date} end   - OBSOLETE. The date at which the default viewing window should end. Can be a date string or a Date object
     * @param {Object} [dim]   - What the dimensions of SVG Element should be
     */
    class ProjectWindow extends SVG.SVGDrawable {
        headerGap: number;
        beginningRatio: number;
        lastBubble: any;
        headerGrp: SVGElement;
        coverGrp: SVGElement;
        txtGrp: SVGElement;
        lineGrp: SVGElement;
        autoResize: boolean;
        expanded: any;
        eventGrp: any;
        headerDiv: any;
        onlyShowVisibleTitles: any;
        view: any;
        textDiv: any;
        options: any;
        fontProperty: any;
        itemGrp: any;
        overlay: any;
        overlayGrp: any;
        segmentColors: any;
        fillProperty: any;
        lineProperty: any;
        expandedInfoCB: any;
        start: any;
        originalView: any;
        dimensions: any;
        originalWindow: {
            width: number;
            height: number;
        };
        originalDimensions: any;
        impDateCatSelector: any;
        dateForm: any;
        name: string;
        id: string;
        today: Date;
        relToday: any;
        items: any[];
        eventCnt: number;
        rows: any[];
        lines: any[];
        headers: any[];
        itemHeaders: any[];
        importantDates: IDictionary<any>;
        impDateCategories: any[];
        unitWidth: number;
        rowHeight: number;
        rowSpace: number;
        eventWidthDivisor: number;
        useCoverRects: boolean;
        showWeekends: boolean;
        showOverallLbl: boolean;
        disableFill: boolean;
        showTitles: boolean;
        alwaysShowEvents: boolean;
        headerOffset: string;
        maxHeaderHeight: number;
        refreshNotify: Function;
        barPercentages: number[];
        bottomBarPercentage: number;
        bottomBarGap: number;
        barGap: number;
        eventRow: number;
        protected monthColors: string[];
        protected textColor: string;
        protected bubbleColor: string;
        constructor(name: string, start: Date, dim: IBasicRect);
        protected _addGroups(): void;
        /**
         * Adds listeners to the window in general, like resizing
         * @param {Object} [dim] - The original dimensions of the project window
         */
        AddWindowListeners(dim: any): void;
        /** actually resize the viewport to maintain scale */
        ResizeChart(newDimensions: any): void;
        /**
         * Setup the first instance of the view
         */
        SetupView(): string;
        /** change view dimensions as needed */
        protected _resizeView(newDimensions: any, updateStart?: any): string;
        /**
         * Takes in an input and returns the relative poisition on the default start date
         *
         * @param {Date} input - A date or date string that should be converted to a relative date
         * @param {Date} [start] - If provided, will compare this as the baseline point
         *
         * @returns {number} Where the relative date falls on the relative timeline
         */
        ConvertToProjectPoint(input: any, start?: any, addTime?: any): any;
        /**
         * Takes a relative project point and reverts it to its original point.
         *
         * @param {number} pt - The relative date to convert
         *
         * @returns {Date} The reverted date
         */
        RevertFromProjectPoint(pt: any): any;
        AddGrouper(lbl: any): void;
        AddSpacer(name: any): void;
        CreateExpandedInfo(addl: any): any;
        WriteArray(arr: any, before: any, after: any, exclude?: any): any;
        /**
         * Adds a timeline item to the view
         *
         * @param {date} s - The start date for the item
         * @param {date} e - The end date for the item
         * @param {string} lbl - What to use to display information about the item
         * @param {array} segments - An array of arrays of objects that contain the data to display for each of the rows of the item
         * @param {object} addl - Any additional details about the item that are worth knowing
         * @returns {SVGElement} The item that was created
         */
        AddItem(s: any, e: any, lbl: any, segments: any, addl: any, offset: any): any;
        /** Adds the covering rectangle for an item */
        protected __addCoverRect(item: any): void;
        /**
         * Creates a context menu for the item
         *
         * @param {Object} item - The item to add the menu to
         *
         * @returns {ContextMenu} The menu to display for this element
         */
        AddContextMenu(item: any): any;
        /**
         * Grabs the row at which an item appears
         * @param {Object} item - The item to grab the row of
         * @returns {number} The row at which the item appears
         */
        GetRowOfItem(item: any): any;
        /**
         * Creates the top/bottom segments of an item
         * @param {Array} arr - The segments to create
         * @param {Object} item - The item to add this to
         */
        CreateSegments(arr: any, item: any, start: any, end: any, startY: any, segRow: any): void;
        /**
         * Creates a segment for a piece of the project plan.
         *
         * @param {Object} item - The item this is being created for
         * @param {Object} start - The start x & y value
         * @param {number} end - At what point the segment ends
         * @param {Object} data - Any additional available data about the segment
         * @param {number} idx - What index of segment we are creating
         * @param {bool} isBottom - True if we are drawing the bottom set of segments
         *
         * @returns {SVGDrawable} The created segment
         */
        CreateSegment(item: any, start: any, end: any, data: any, idx: any, rowNum: any, addl: any): any;
        /**
         * Sets the style for the provided segment. Can be overriden by individual implementations
         * @param {SVGElement} segment - Data about the segment to set the appropriate color
         * @param {number} idx - The index of the segment
         */
        SetSegmentStyle(segment: any, idx: any): void;
        /**
         * Adds data about an event without actually drawing it
         *
         * @param {Object} item     - The item object to add event data to
         * @param {Date} pos      - The date at which this event should appear. Accepts a date string or Date object
         * @param {String} lbl      - What label should appear for the event on hover
         * @param {Object} addlInfo - Any additional information needed about the event
         *
         * @returns {Object} The data about the created event
         */
        AddEventData(item: any, pos: any, lbl: any, addlInfo: any): any;
        /**
         * Adds an event & draws it
         *
         * @param {Object} item - The item object to add event data to
         * @param {Object} [ev] - If available, the data that was already created for this event. Created if not passed in
         * @param {Date} [pos] - The date at which this event should appear. If ev is passed in, this is ignored
         * @param {String} [lbl] - The label that should appear for this event. If ev is passed in, this is ignored
         * @param {Object} [addlInfo] - Any additional info available for the event
         *
         * @returns {SVGElement} The event that was created
         */
        AddEvent(item: any, ev: any, pos: any, lbl: any, addlInfo: any, large: any): any;
        /**
         * Removes all events linked to an event from the canvas (but not the internal collection)
         * Used to only draw events on zoom in
         * @param {Object} item - The item to remove events from
         */
        RemoveEvents(item: any): void;
        /**
         * Adds all events in an item's internal array to the canvas.
         * Used to only draw events on zoom in
         * @param {Object} item - The item to add events to.
         */
        AddEvents(item: any, large?: any): void;
        /**
         * Expands an item to fill the screen.
         * Allows the view of more details about the event
         * @param {Object} item - The item to expand
         */
        ExpandItem(item: any): void;
        /**
         * Gets the row at which an item should appear, before the item is created
         *
         * @param {Date} start - The start date of the event we are getting the row for
         * @param {Date} end - The end date of the event we are getting the row for
         *
         * @returns {number} The row number for this item
         */
        GetRow(start: any, end: any): number;
        /**
         * OBSOLETE Creates a text bubble as an SVG
         * @param {number} x      The x coordinate the bubble should appear at
         * @param {number} y      The y coordinate the bubble should appear at
         * @param {String} lbl    The label that should appear in the bubble
         * @param {SVGGroup} layer - The layer at which this bubble should be added
         * @param {Object} origin - The origin of the text that will be displayed
         * @returns {SCGElement} The bubble that is created
         */
        AddSVGTextBubble(x: any, y: any, lbl: any, layer: any, origin: any): any;
        /**
         * Adds a label hover bubble for an svg element. Stays in the same place for the DLG
         *
         * @param {String} lbl - The label that should appear in the bubble
         * @param {SVGElement} elem - The element to add the bubble to
         * @param {Object} item - The item object that this bubble is generally being applied to
         * @param {number} [anchor_x] - The x-position at which a bubble should always appear
         * @param {number} [anchor_y] - The y-position at which a bubble should always appear
         *
         * @returns {HTMLElement} The text bubble that was created
         */
        AddTextBubble(lbl: any, elem: any, item: any, anchor_x?: any, anchor_y?: any, origOpacity?: any): any;
        /**
         * Creates the lines indicating dates on the Gantt chart
         */
        CreateGuidelines(): void;
        /**
         * Creates the headers for the dates on the Gantt chart
         */
        CreateGuideHeaders(noNumbers?: any): void;
        /**
         * Handle updating our guidelines on zoom
         * @param {number} amt - The amount that has been zoomed
         */
        Zoom(amt: any): void;
        RemoveText(): void;
        ReaddText(end: any): void;
        /**
         * Handle updating our guidelines on pan
         * @param {number} amtX - The x amount to move the viewbox
         * @param {number} amtY - The y amount to move the viewbox
         */
        Pan(amtX: any, amtY: any): void;
        /**
         * Allows the user to sort the items in the Gantt chart according to a particular sort function
         * @param {function} sortFunc - The function to sort the list by
         */
        Sort(sortFunc: any, titleFunc: any): void;
        /**
         * Clears all data about this project.
         */
        Clear(): void;
        /**
         * Clears the UI of the project, but not its internal data
         */
        ClearUI(): void;
        RemoveItem(item: any, refreshesLater: any): void;
        /**
         * Temporarily resizes an item via a transform matrix
         *
         * @param {Object} item - The item to resize & reposition
         * @param {Object} newDim - The new dimensions to use for the item
         * @param {number} newDim.x - The new x position
         * @param {number} newDim.y - The new y position
         * @param {number} newDim.w - The new width of the item
         * @param {number} newDim.h - The new height of the item
         * @param {number} [newDim.scaleW] - The percentage to scale by. Used in place of w if provided
         * @param {number} [newDim.scaleH] - The percentage to scale by. Used in place of h if provided
         */
        ResizeAndRepositionItem(item: any, newDim: any): void;
        /**
         * Disables showing the titles inline
         * @param {boolean} [undo] - If true, enables the titles
         */
        DisableTitles(undo: any): void;
        /**
         * Changes the y position of an item
         * @param {Object} item - The item that is being adjusted
         * @param {number} newY - The new Y value that this item should appear at
         * @param {number} row  - The new row value of the item
         */
        AdjustY(item: any, newY: any, row: any): void;
        /**
         * Refreshes the display so that new Y values are accommodated
         */
        RefreshUI(fromPanZoom?: boolean, unscale?: boolean): void;
        /** adjust a project line title to be visible */
        protected __adjustTitleToBeOnScreen(zeroX: any, item: any): void;
        AddItemHeader(idx: any, label: any): void;
        /**
         * Adds an important date to our internal collection.
         */
        AddImportantDate(startDate: any, lbl: any, color: any, textColor: any, endDate: any, category: any): void;
        AddImportantDateCategory(catName: any): any;
        RemoveImportantDate(dt: any, idx: any): void;
        Jump(x: any, y: any): void;
        AfterDrawChildren(): void;
        /**
         * _updateTranslation
         * @param element
         */
        protected _updateTranslation(element: any): void;
        /**
         * _getPosition
         */
        protected _getPosition(elem: any): any;
        /**
         *
         */
        protected _unscaleAppropriateElements(): void;
        /**
         * _unscaleElement
         *
         * @param elem
         * @param scale
         */
        protected _unscaleElement(elem: any, scale: any): void;
    }
}
declare namespace KIP {
    interface PopupElements extends IDrawableElements {
        base: HTMLElement;
        overlay: HTMLElement;
        frame: HTMLElement;
        title: HTMLElement;
        content: HTMLElement;
        closeBtn: HTMLElement;
        buttonContainer: HTMLElement;
    }
    interface IPopupDefinition extends IElemDefinition {
        themeColor?: string;
    }
    /**...........................................................................
     * @class Popup
     * Generic class to show data in a popup form
     * @version 1.0
     * ...........................................................................
     */
    class Popup extends Drawable {
        /** elements contained within the popup */
        protected _elems: PopupElements;
        /** styles to render the popup with */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * Creates a new popup form
         * @param 	obj 	If included, contains info on how to create this popup
         * ...........................................................................
         */
        constructor(obj?: IPopupDefinition);
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Creates all of the elements needed for this popup
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * _createOverlay
         * ...........................................................................
         * Creates the overlay for the popup to shield the rest of the page
         * ...........................................................................
         */
        private _createOverlay();
        /**...........................................................................
         * _createFrame
         * ...........................................................................
         * Create the frame of the popup
         * ...........................................................................
         */
        private _createFrame();
        /**...........................................................................
         * _createTitle
         * ...........................................................................
         * Create the title of the popup
         * ...........................................................................
         */
        private _createTitle();
        /**...........................................................................
         * _createCloseButton
         * ...........................................................................
         * Create the close button for the form
         * ...........................................................................
         */
        private _createCloseButton();
        /**...........................................................................
         * _createContentElement
         * ...........................................................................
         * Create the element taht will hold all content for the popup
         * ...........................................................................
         */
        private _createContentElement();
        /**...........................................................................
         * _createButtonContainer
         * ...........................................................................
         * Create the container that will hold buttons
         * ...........................................................................
         */
        private _createButtonContainer();
        /**...........................................................................
         * setTitle
         * ...........................................................................
         * Sets the title for the popup
         *
         * @param 	title	What to set as the title
         * ...........................................................................
         */
        setTitle(title: string): void;
        /**...........................................................................
         * addContent
         * ...........................................................................
         * Allows the caller to add a Drawable to the popup
         *
         * @param 	drawable 	The drawable element to add
         * ...........................................................................
         */
        addContent(drawable: Drawable): void;
        /**...........................................................................
         * addContent
         * ...........................................................................
         * Allows the caller to add an HTMLElement to the popup
         *
         * @param	elem	The HTMLElement to add
         * ...........................................................................
         */
        addContent(elem: HTMLElement): void;
        /**...........................................................................
         * addContent
         * ...........................................................................
         * Allows the caller to pass basic info to the popup so that
         * createSimpleElement can be called
         *
         * @param	id		ID of the element to be created
         * @param	cls		Class of the element to be created
         * @param	content	What content the element should contain
         * ...........................................................................
         */
        addContent(id?: string, cls?: string | IClasses, content?: string): void;
        /**...........................................................................
         * addContent
         * ...........................................................................
         * Allows the caller to add detailed info to the popup so that createElement
         * can be called
         *
         * @param	obj		The object containing data on how to create the element
         * ...........................................................................
         */
        addContent(obj: IElemDefinition): void;
        /**...........................................................................
         * clearContent
         * ...........................................................................
         * Clears all content out of the form
         * ...........................................................................
         */
        clearContent(): void;
        /**...........................................................................
         * addButton
         * ...........................................................................
         * Adds a button to the popup
         *
         * @param 	label 		The label to use for the button
         * @param 	callback 	What to do when the button is clicked
         * ...........................................................................
         */
        addButton(label: string, callback: Function): void;
    }
}
declare namespace KIP {
    class ErrorPopup extends Popup {
        constructor(details: string, title?: string, obj?: IElemDefinition);
    }
}
declare namespace KIP {
    interface LoginPopupElements extends PopupElements {
        username: HTMLInputElement;
        password: HTMLInputElement;
    }
    /**
     * @class LoginPopup
     *
     * Creates a popup with fields for handling login
     * @version 1.0
     *
     */
    class LoginPopup extends Popup {
        /** elems contained within this popup */
        protected _elems: LoginPopupElements;
        /** what to do when the user chooses to login */
        protected _loginCallback: Function;
        loginCallback: Function;
        /** draw specific styles for this particular popup */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** make sure we get a mix of core styles and these styles */
        protected _getUncoloredStyles(): Styles.IStandardStyles;
        /**
         * Creates a LoginPopup object
         * @param   obj     If provided, the data to create the base element of the popup
         */
        constructor(obj?: IElemDefinition);
        /**
         * _createElements
         *
         * Creates the elements for this particular popup
         */
        protected _createElements(): void;
        /**
         * erase
         *
         * Handles undrawing the popup
         */
        erase(): void;
    }
}
declare namespace KIP {
    class ToastPopup extends Popup {
        private _showFor;
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        protected _getUncoloredStyles(): Styles.IStandardStyles;
        constructor(details: string, title?: string, showFor?: number, obj?: IElemDefinition);
        draw(parent?: HTMLElement, force?: boolean): void;
        erase(): void;
    }
}
declare namespace KIP {
    enum YesNoEnum {
        YES = 1,
        NO = 0,
    }
    /**...........................................................................
     * IYesNoCallback
     * ...........................................................................
     * @param   data
     * ...........................................................................
     */
    interface IYesNoCallback {
        (data: YesNoEnum): void;
    }
    class YesNoPopup extends Popup {
        /** handle a callback when the user makes a selection */
        protected _onSelection: IYesNoCallback;
        /**...........................................................................
         * Creates a YesNoPopup
         * @param   prompt  What to ask the user
         * @param   obj
         * ...........................................................................
         */
        constructor(prompt: string, onSelection: IYesNoCallback, obj?: IElemDefinition);
        /**...........................................................................
         * _createButtons
         * ...........................................................................
         * Create the yes/no buttons for the popup
         * ...........................................................................
         */
        protected _createButtons(): void;
        /**...........................................................................
         * _createButton
         * ...........................................................................
         * Create a button in the yes / no form
         * ...........................................................................
         */
        protected _createButton(label: string, value: YesNoEnum): void;
    }
    /**...........................................................................
     * showYesNoForm
     * ...........................................................................
     * Show a particular yes - no prompt
     *
     * @param   prompt  The text to display for the form
     *
     * @returns The selection made by the user
     * ...........................................................................
     */
    function showYesNoForm(prompt: string, onSelect: IYesNoCallback): void;
}
declare namespace KIP {
    /**...........................................................................
     * IDynamicOption
     * ...........................................................................
     * Keep track of a choice for a dynamic selection
     * ...........................................................................
     */
    interface IDynamicOption {
        id: string;
        display: string;
    }
    /**...........................................................................
     * IDynamicSelectElems
     * ...........................................................................
     * Keep track of the elements used in the Dynamic Select field
     * ...........................................................................
     */
    interface IDynamicSelectElems extends IDrawableElements {
        input: HTMLInputElement;
        drawer: HTMLElement;
        optionContainer: HTMLElement;
        loadingIcon: HTMLElement;
        innerOptions: HTMLElement;
        clearBtn: HTMLElement;
    }
    /**...........................................................................
     * @class DynamicSelect
     * Create a select element
     * @version 1.0
     * ...........................................................................
     */
    abstract class DynamicSelect extends Drawable {
        /** keep track of the options that are available for this select field */
        protected _availableOptions: Collection<DynamicOption>;
        /** keep track of whether we are currently running a query */
        protected _isQuerying: boolean;
        /** keep track of the next query we need to run if we're already querying */
        protected _nextQuery: string;
        /** keep track of the current query we're running */
        protected _currentQuery: string;
        /** keep track of elements needed for the select element */
        protected _elems: IDynamicSelectElems;
        /** make sure we can let listeners know about changes in this element*/
        protected _selectListeners: Function[];
        /** keep track of general change listeners */
        protected _changeListeners: Function[];
        /** keep track of the listeners for searching */
        protected _searchListeners: Function[];
        /** keep track of the styles associated with this select field */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * Create the Dynamic Select element
         * ...........................................................................
         */
        constructor();
        protected _createElements(): void;
        /**...........................................................................
         * _expandDrawer
         * ...........................................................................
         * Expand the drawer of options
         * ...........................................................................
         */
        protected _expandDrawer(): void;
        /**...........................................................................
         * _collapseDrawer
         * ...........................................................................
         * Collapse the drawer of options
         * ...........................................................................
         */
        protected _collapseDrawer(): void;
        /**...........................................................................
         * addOption
         * ...........................................................................
         * Adds an option to our select field
         *
         * @param   opt     The option to add
         * ...........................................................................
         */
        addOption(opt: IDynamicOption): void;
        /**...........................................................................
         * addOptions
         * ...........................................................................
         * Add a set of options to the select element
         * @param   opts    The options to add
         * ...........................................................................
         */
        addOptions(opts: IDynamicOption[]): void;
        addEventListener(type: "select" | "change" | "search", func: Function): void;
        /**
         * _notifyChangeListeners
         *
         * Notify any listeners that some content changed
         */
        protected _notifyChangeListeners(): void;
        /**
         * _notifySelectListeners
         *
         * Notify any listeners that we have selected an element
         * @param   selectedOption  The option that was selected
         */
        protected _notifySelectListeners(selectedOption: DynamicOption): void;
        /**................................................................
         * _notifySearchListeners
         * ................................................................
         * @param search
         * ................................................................
         */
        protected _notifySearchListeners(search: string): void;
        /**...........................................................................
         * _onChange
         * ...........................................................................
         * Handle when the text field changes
         *
         * @param   e   Change event
         * ...........................................................................
         */
        protected _onQueryTextChange(e: Event): void;
        /**...........................................................................
         * _onKeyUp
         * ...........................................................................
         * Check if we need to handle an enter press in the text field
         *
         * @param   e   The keyboard event fired
         * ...........................................................................
         */
        protected _onKeyEvent(e: KeyboardEvent): void;
        /**...........................................................................
         * _onBlur
         * ...........................................................................
         * Handle when focus is lost on the search element
         * @param   event   The focus event
         * ...........................................................................
         */
        protected _onBlur(event: Event): void;
        /**...........................................................................
         * _onFocus
         * ...........................................................................
         * Handle when focus is given to the search element
         * @param   event   The focus event
         * ...........................................................................
         */
        protected _onFocus(event: Event): void;
        /**...........................................................................
         * select
         * ...........................................................................
         * Handle selecting an element in the search field
         * @param   selectedOption  The option that was selected
         * ...........................................................................
         */
        select(selectedOption: DynamicOption): void;
        /**
         * search
         *
         * Handle searching for a string that wasn't an option in
         * our search results
         *
         * @param searchStr
         */
        search(searchStr: string): void;
        /**...........................................................................
         * _updateFiltering
         * ...........................................................................
         * make sure our filtered text reflects the most up-to-date value in the text field
         * ...........................................................................
         */
        _updateFiltering(curText: string): void;
        /**...........................................................................
         * _query
         * ...........................................................................
         * Handle querying for additional options to add
         * @param   queryText   The text to search
         * ...........................................................................
         */
        protected _query(queryText?: string): void;
        clear(): void;
        protected abstract _onQuery(queryText: string): KipPromise;
    }
    /**...........................................................................
     * IDynamicOptionElems
     * ...........................................................................
     *
     * ...........................................................................
     */
    interface IDynamicOptionElems extends IDrawableElements {
        base: HTMLElement;
        text: HTMLElement;
    }
    /**...........................................................................
     * @class DynamicOption
     * ...........................................................................
     * Create an option for a dynamic select field
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class DynamicOption extends Drawable implements IDynamicOption {
        /** unique ID for  */
        protected _id: string;
        readonly id: string;
        /** display string for the option */
        protected _display: string;
        readonly display: string;
        /** determine whether this option is currently filtered */
        protected _isFiltered: boolean;
        readonly isFiltered: boolean;
        /** determine whether this option is selected */
        protected _isSelected: boolean;
        readonly isSelected: boolean;
        /** keep track of the elements */
        protected _elems: IDynamicOptionElems;
        /** keep track of the dynamic select element for this option */
        protected _selectParent: DynamicSelect;
        /** track styles for the option field */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles;
        /**...........................................................................
         * Create the dynamic option
         *
         * @param   opt     Details of the option we are creating
         * ...........................................................................
         */
        constructor(opt: IDynamicOption, parent: DynamicSelect);
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Determine if we should avoid creating elements in the constructor
         * @returns True if we should skip the create elements
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create elements for this option
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * select
         * ...........................................................................
         * Select this particular element
         * ...........................................................................
         */
        select(): boolean;
        /**...........................................................................
         * hilite
         * ...........................................................................
         * Hilite the current selected element
         * ...........................................................................
         */
        hilite(): boolean;
        /**...........................................................................
         * unhilite
         * ...........................................................................
         * ...........................................................................
         */
        unhilite(): boolean;
        /**...........................................................................
         * _filter
         * ...........................................................................
         * Filter out this option if appropriate
         * ...........................................................................
         */
        protected _filter(): void;
        /**...........................................................................
         * _unfilter
         * ...........................................................................
         * Remove filtering for this option if appropriate
         * ...........................................................................
         */
        protected _unfilter(): void;
        /**...........................................................................
         * tryFilter
         * ...........................................................................
         * Asynchronous call to ensure that options that don't match the current
         * select string are filtered out of the results
         *
         * @param   words   The words required in a relevant string for the option
         *                  in order to not filter
         *
         * @returns Promise that will run the
         * ...........................................................................
         */
        tryFilter(words: string[]): KipPromise;
    }
}
declare namespace KIP {
    interface IShieldElements extends IDrawableElements {
        base: HTMLElement;
        shieldContent: HTMLElement;
    }
    abstract class Shield extends Drawable {
        protected _elems: IShieldElements;
        protected static _uncoloredStyles: Styles.IStandardStyles;
        constructor();
        protected _createElements(): void;
        protected abstract _createShieldDetails(): void;
        draw(parent?: HTMLElement): void;
    }
}
declare namespace KIP {
    /**...........................................................................
     * ILoadingShieldElements
     * ...........................................................................
     * Keep track of elements
     * ...........................................................................
     */
    interface ILoadingShieldElements extends IShieldElements {
        text: HTMLElement;
        icon: HTMLElement;
        wrapper: HTMLElement;
    }
    /**...........................................................................
     * @class LoadingShield
     * ...........................................................................
     * Show a loading indication
     * @version 1.0
     * ...........................................................................
     */
    class LoadingShield extends Shield {
        protected _elems: ILoadingShieldElements;
        protected _loadingText: string;
        /** styles for the loading shield */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** make sure we return the right set of styles */
        protected _getUncoloredStyles(): Styles.IStandardStyles;
        /**...........................................................................
         * Create a loading shield
         * @param   loadingText   Additional etxt to display while loading
         * ...........................................................................
         */
        constructor(loadingText?: string);
        /** skip creating elements before data is set */
        protected _shouldSkipCreateElements(): boolean;
        protected _createShieldDetails(): void;
    }
}
declare namespace KIP.SVG {
    /**...........................................................................
     * ISVGElementElems
     * ...........................................................................
     * Keep track of elements on an SGVElem
     * ...........................................................................
     */
    interface ISVGElementElems extends IDrawableElements {
        base: SVGElement;
    }
    /**...........................................................................
     * @class ISVGAttributes
     * ...........................................................................
     * Additional attributes that can be applied
     * ...........................................................................
     */
    interface ISVGAttributes extends IAttributes {
        id?: string;
        unscalable?: boolean;
        svgStyle?: ISVGStyle;
        parent?: SVGElement;
        type?: string;
        [key: string]: any;
    }
    /**...........................................................................
     * @class   SVGElem
     * ...........................................................................
     * Creates an element on an SVG Drawable
     * @version 1.1
     * @author  Kip Price
     * ...........................................................................
     */
    abstract class SVGElem extends Drawable {
        /** unique identifier for the element */
        id: string;
        /** keep track of how this element is styled */
        protected _style: SVGStyle;
        readonly style: SVGStyle;
        /** keep track of the elements in this SVGElement */
        protected _elems: ISVGElementElems;
        readonly base: SVGElement;
        /** determine whether this element should be scalable */
        protected _preventScaling: boolean;
        readonly preventScaling: boolean;
        /** keep track of the extrema for this element */
        protected _extrema: IExtrema;
        readonly extrema: IExtrema;
        /** store the attributes */
        protected _attributes: ISVGAttributes;
        /**...........................................................................
         * Creates an SVG element
         * @param   attributes  The attributes to create this element with
         * ...........................................................................
         */
        constructor(attributes: ISVGAttributes, ...addlArgs: any[]);
        /**...........................................................................
         * _shouldSkipCreateElements
         * ...........................................................................
         * Determine whether we should allow elements to be drawn as part of the
         * constructor.
         *
         * @returns True, since we always need attributes
         * ...........................................................................
         */
        protected _shouldSkipCreateElements(): boolean;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements that make up this SVG Element
         *
         * @param   attributes  Attributes for this element
         * ...........................................................................
         */
        protected _createElements(attributes: ISVGAttributes): void;
        /**...........................................................................
         * _setAttributes
         * ...........................................................................
         * Set the appropriate set of attributes for this element
         *
         * @param   attributes  The initial attributes
         * @param   addlArgs    Anything additional we should be passing to the setAttributes function
         *
         * @returns The updated attributes
         * ...........................................................................
         */
        protected abstract _setAttributes(attributes: ISVGAttributes, ...addlArgs: any[]): ISVGAttributes;
        protected abstract _updateExtrema(attributes: ISVGAttributes): void;
    }
}
declare namespace KIP.SVG {
    interface ICurvePoint extends IPoint {
        controls: IPoint[];
    }
    interface IArcPoint extends IPoint {
        radius: IPoint;
        xRotation: number;
        largeArc: number;
        sweepFlag: number;
    }
    type IPathPoint = IPoint | ICurvePoint | IArcPoint;
    enum SVGShapeEnum {
        CHECKMARK = 1,
        X = 2,
        PLUS = 3,
    }
    interface IPathSVGAttributes extends ISVGAttributes {
        noFinish?: boolean;
    }
    interface IPathElems extends ISVGElementElems {
        base: SVGPathElement;
    }
    /**...........................................................................
     * @class   PathElement
     * ...........................................................................
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class PathElement extends SVGElem {
        /** keep track of elements in this path */
        protected _elems: IPathElems;
        /** keep track of points in this path */
        protected _points: IPathPoint[];
        constructor(points: IPathPoint[], attr: IPathSVGAttributes, ...addlArgs: any[]);
        protected _setAttributes(attributes: ISVGAttributes, points: IPathPoint[]): ISVGAttributes;
        protected _createElements(): void;
        protected _updateExtrema(): void;
        private _updateExtremaFromPoint(pt);
        /**...........................................................................
         * _checkForCurrentPath
         * ...........................................................................
         *
         * ...........................................................................
         */
        private _checkForCurrentPath();
        /**...........................................................................
         * _constructPathAttribute
         * ...........................................................................
         * @param prefix
         * @param point
         * @returns	The appropriate path string
         * ...........................................................................
         */
        private _constructPathAttribute(prefix, point);
        private _pointToAttributeString(point);
        private _addToPathAttribute(suffix);
        protected _startPath(attr?: ISVGAttributes): SVGPathElement;
        lineTo(point: IPoint): void;
        moveTo(point: IPoint): void;
        curveTo(point: ICurvePoint): void;
        arcTo(point: IArcPoint): void;
        /** closes the path so it creates an enclosed space */
        closePath(): void;
        /** indicates the path is finished without closing the path */
        finishPathWithoutClosing(): void;
        /**...........................................................................
         * _calculatePolygonPoint
         * ...........................................................................
         * helper function to calculate a polygon's point at a certain angle
         * ...........................................................................
         */
        protected _calculatePolygonPoint(centerPt: IPoint, currentAngle: number, radius: number): IPoint;
    }
}
declare namespace KIP.SVG {
    /**...........................................................................
     * @class	PathExtensionElement
     * ...........................................................................
     * @version 1.0
     * @author	Kip Price
     * ...........................................................................
     */
    abstract class PathExtensionElement extends PathElement {
        protected _setAttributes(attr: IPathSVGAttributes, ...addlArgs: any[]): IPathSVGAttributes;
        protected abstract _generatePoints(...addlArgs: any[]): IPathPoint[];
    }
    /**...........................................................................
     * @class	ArcElement
     * ...........................................................................
     * @version	1.0
     * @author	Kip Price
     * ...........................................................................
     */
    class ArcElement extends PathExtensionElement {
        protected _generatePoints(attr: IPathSVGAttributes): IPathPoint[];
        /**...........................................................................
         * addPerfectArc
         * ...........................................................................
         * Adds a perfect arc to the SVG canvas
         * //TODO: make real
         * ...........................................................................
         */
        addPerfectArc(centerPt: IPoint, radius: number, startDegree: number, endDegree: number, direction: number, noRadii: boolean, attr?: IAttributes, group?: SVGElement): SVGElement;
        /**...........................................................................
         * _arcToExtrema
         * ...........................................................................
         * helper function to convert arc params to extrema
         * ...........................................................................
         */
        private _arcToExtrema(startPt, endPt, centerPt, radius, startDeg, endDeg);
    }
    /**...........................................................................
     * @class	PolygonElement
     * ...........................................................................
     * @version	1.0
     * @author	Kip Price
     * ...........................................................................
     */
    class PolygonElement extends PathExtensionElement {
        constructor(centerPt: IPoint, sides: number, radius: number, attr: IPathSVGAttributes, innerRadius?: number);
        protected _generatePoints(centerPt: IPoint, sides: number, radius: number, innerRadius?: number): IPathPoint[];
    }
    /**...........................................................................
     * @class	StarElement
     * ...........................................................................
     * @version 1.0
     * @author	Kip Price
     * ...........................................................................
     */
    class StarElement extends PolygonElement {
        constructor(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number, attr: IPathSVGAttributes);
        protected _generatePoints(centerPt: IPoint, numberOfPoints: number, radius: number, innerRadius: number): IPathPoint[];
    }
    /**...........................................................................
     * @class	CheckElement
     * ...........................................................................
     */
    class CheckElement extends PathExtensionElement {
        protected _generatePoints(): IPathPoint[];
    }
    /**...........................................................................
     * @class	ExElement
     * ...........................................................................
     */
    class ExElement extends PathExtensionElement {
        protected _generatePoints(): IPathPoint[];
    }
    /**...........................................................................
     * @class	PlusElement
     * ...........................................................................
     */
    class PlusElement extends PathExtensionElement {
        protected _generatePoints(): IPathPoint[];
    }
}
declare namespace KIP.SVG {
    interface ICircleSVGAttributes extends ISVGAttributes {
        cx: number;
        cy: number;
        r: number;
    }
    /**...........................................................................
     * @class   CircleElement
     * ...........................................................................
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class CircleElement extends SVGElem {
        /** keep track of attributes for this circle */
        protected _attributes: ICircleSVGAttributes;
        constructor(center: IPoint, radius: number, attributes: ISVGAttributes);
        protected _setAttributes(attributes: ISVGAttributes, center: IPoint, radius: number): ISVGAttributes;
        protected _updateExtrema(attributes: ISVGAttributes): void;
        /**...........................................................................
         * _extremaFromCenterPointAndRadius
         * ...........................................................................
         * helper function to calculate extrema from a central point and radius
         * ...........................................................................
         */
        private _extremaFromCenterPointAndRadius(center, radius);
    }
}
declare namespace KIP.SVG {
    /**...........................................................................
     * @class SVGGradientTypeEnum
     * ...........................................................................
     * Handle different types of gradients
     * ...........................................................................
     */
    enum SVGGradientTypeEnum {
        Linear = 1,
        Radial = 2,
    }
    /**...........................................................................
     * @class IGradientPoint
     * ...........................................................................
     * Keep track of a point used for gradients
     * ...........................................................................
     */
    interface IGradientPoint {
        point: IPoint;
        color: string;
        offset: string;
        opacity: number;
    }
    /**...........................................................................
     * ITransforms
     * ...........................................................................
     * ...........................................................................
     */
    interface ITransforms {
        start: IPoint;
        end: IPoint;
    }
    /**...........................................................................
     * @class	GradientElement
     * ...........................................................................
     * @version 1.0
     * @author	Kip Price
     * ...........................................................................
     */
    abstract class GradientElement extends SVGElem {
        /**...........................................................................
         * @param type
         * @param points
         * @param transforms
         * ...........................................................................
         */
        constructor(type: SVGGradientTypeEnum, points: IGradientPoint[], transforms: ITransforms);
        /**...........................................................................
         * _setAttributes
         * ...........................................................................
         * @param attr
         * @param type
         * @param points
         * @param transforms
         * ...........................................................................
         */
        protected _setAttributes(attr: ISVGAttributes, type: SVGGradientTypeEnum, points: IGradientPoint[], transforms: ITransforms): ISVGAttributes;
        /**...........................................................................
         * _createPoints
         * ...........................................................................
         * @param parent
         * @param points
         * ...........................................................................
         */
        private _createPoints(parent, points);
        /**...........................................................................
         * _createTransforms
         * ...........................................................................
         * @param transforms
         * @param id
         * ...........................................................................
         */
        private _createTransforms(transforms, id);
        /**...........................................................................
         * _updateExtrema
         * ...........................................................................
         */
        protected _updateExtrema(): void;
        /**...........................................................................
         * _createElements
         * ...........................................................................
         */
        protected _createElements(): void;
    }
    class LinearGradient extends GradientElement {
        constructor(points: IGradientPoint[], transforms: ITransforms);
    }
    class RadialGradient extends GradientElement {
        constructor(points: IGradientPoint[], transforms: ITransforms);
    }
}
declare namespace KIP.SVG {
    /**...........................................................................
     * @class   GroupElement
     * ...........................................................................
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class GroupElement extends SVGElem {
        protected _setAttributes(attributes: ISVGAttributes): ISVGAttributes;
        protected _updateExtrema(attributes: ISVGAttributes): void;
    }
}
declare namespace KIP.SVG {
    /**...........................................................................
     * @class IRectSVGAttributes
     * ...........................................................................
     * Rectangle attributes
     * ...........................................................................
     */
    interface IRectSVGAttributes extends ISVGAttributes {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
    }
    /**...........................................................................
     * @class   RectangleElement
     * ...........................................................................
     * Draw a rectangle on the SVG element
     * @version 1.0
     * @author  Kip Price
     * ...........................................................................
     */
    class RectangleElement extends SVGElem {
        protected _attributes: IRectSVGAttributes;
        /**...........................................................................
         * Create a rectangle element
         * @param   x           The horizontal position of the rectangle
         * @param   y           The vertical position of the rectangle
         * @param   width       The width of the rectangle
         * @param   height      The height of the rectangle
         * @param   attributes  Attributes to start with
         * ...........................................................................
         */
        constructor(x: number, y: number, width: number, height: number, attributes: IRectSVGAttributes);
        /**...........................................................................
         * _setAttributes
         * ...........................................................................
         * Set the appropriate attributes for this element
         *
         * @param   attributes  Initial set of attributes
         * @param   x           The horizontal coordinate
         * @param   y           The vertical coordinate
         * @param   width       The width of the rectangle
         * @param   height      The height of the rectangle
         *
         * @returns The updated attributes
         * ...........................................................................
         */
        protected _setAttributes(attributes: IRectSVGAttributes, x: number, y: number, width: number, height: number): IRectSVGAttributes;
        protected _updateExtrema(attributes: IRectSVGAttributes): void;
        /**...........................................................................
         * _basicRectToExtrema
         * ...........................................................................
         * helper function to turn a basic rect to extrema
         * @param	rect	Rect to convert
         * @returns	The extrema that correspond with the rect
         * ...........................................................................
         */
        private _basicRectToExtrema(rect);
        /**...........................................................................
         * _checkBasicRectForBadData
         * ...........................................................................
         * helper function to check that a rectangle is actually renderable
         * @param	rect	Determine if a rectangle is renderable
         * ...........................................................................
         */
        private _checkBasicRectForBadData(rect);
    }
}
declare namespace KIP.SVG {
    /**...........................................................................
     * @class ISVGStyle
     * ...........................................................................
     * Keep track of SVG styles
     * ...........................................................................
     */
    interface ISVGStyle {
        fill: string;
        fillOpacity?: number;
        fontSize?: number;
        fontWeight?: string;
        fontFamily?: string;
        stroke: string;
        strokeWidth?: number;
        strokeOpacity?: number;
        strokeLinecap?: string;
        strokeLinejoin?: string;
    }
    /**...........................................................................
     * @class	SVGStyle
     * ...........................................................................
     * Keep track of style changes for SVG elements
     * @version 1.0
     * @author	Kip Price
     * ...........................................................................
     */
    class SVGStyle implements ISVGStyle {
        /** keep track of the last generated string */
        protected _generatedStyleString: string;
        /** inner tracking for our particular style selements */
        protected _innerStyle: ISVGStyle;
        /** keep track of whether we need to regenerate the string to use for the SVG style */
        protected _needsNewString: boolean;
        /**...........................................................................
         * _setStyle
         * ...........................................................................
         * Update a particular style
         * @param 	key 	The key
         * @param 	value 	The value
         * ...........................................................................
         */
        protected _setStyle(key: keyof ISVGStyle, value: string | number): void;
        /** fill color or "None" */
        fill: string;
        /** fill opacity */
        fillOpacity: number;
        /** font size */
        fontSize: number;
        /** font weight */
        fontWeight: string;
        /** font family */
        fontFamily: string;
        /** stroke color */
        stroke: string;
        /** stroke width */
        strokeWidth: number;
        /** stroke opacity */
        strokeOpacity: number;
        /** stroke linecap */
        strokeLinecap: string;
        /** stroke linejoin */
        strokeLinejoin: string;
        /** keep track of how the line should be dashed */
        protected _strokeDashArray: string;
        strokeDashArray: string;
        /**...........................................................................
         * Create a SVGStyle object
         * ...........................................................................
         */
        constructor();
        /**...........................................................................
         * clear
         * ...........................................................................
         * Clear out our inner styles to defaults
         * ...........................................................................
         */
        clear(): void;
        /**...........................................................................
         * assignStyle
         * ...........................................................................
         * @param 	element 	The element to set styles on
         * ...........................................................................
         */
        assignStyle(element: SVGElement): void;
        /**...........................................................................
         * _generateStyleString
         * ...........................................................................
         * Generate the appropriate string for the current style
         * ...........................................................................
         */
        protected _generateStyleString(): void;
    }
}
declare namespace KIP.SVG {
    class TextElement extends SVGElem {
        protected _setAttributes(attr: ISVGAttributes): ISVGAttributes;
        protected _updateExtrema(): void;
        /**...........................................................................
         * addtext
         * ...........................................................................
         * Adds a text element to the SVG canvas
         * @param   text     The text to add
         * @param   point    The point at which to add the point
         * @param   originPt If provided, the origin point within the text element that defines where the text is drawn
         * @param   attr     Any attributes that should be applied to the element
         * @param   group    The group to add this element to
         * @returns The text element added to the SVG
         * ...........................................................................
         */
        addText(text: string, point: IPoint, originPt: IPoint, attr: IAttributes, group: SVGElement): SVGElement;
    }
}
declare namespace KIP {
    /**...........................................................................
     * TimelineOptions
     * ...........................................................................
     * display options for a given timeline
     * ...........................................................................
     */
    interface TimelineOptions extends IHTML5CanvasOptions {
        /** how far the Y dimension should extend for a day */
        DAY_HEIGHT?: number;
        /** how far the X dimension should extend for a day */
        DAY_WIDTH?: number;
        /** what should be considered the central date for the timeline */
        CENTRAL_DATE?: Date;
        /** the colors that should be used for the months */
        MONTH_COLORS?: string[];
        /** how days should be formatted per their values */
        DAY_FORMATTING?: {
            NORMAL?: string;
            WEEKEND?: string;
            HOLIDAY?: string;
            TODAY?: string;
        };
        /** what color should be used for borders on elements */
        BORDER_COLOR?: string;
        /** what should be used for the date background */
        DATE_BG_COLOR?: string;
        /** what font-size should be used for all text elements */
        FONT_SIZE?: number;
        /** false if we should hide the headers */
        SHOW_HEADERS?: boolean;
        /** false if we should hide the background */
        SHOW_BACKGROUND?: boolean;
        /** what the gap should be between elements in the canvas */
        BETWEEN_GROUP_GAP?: number;
    }
    /**...........................................................................
     * ProjectDayFormatting
     * ...........................................................................
     * Keep track of how a day should be formatted
     * ...........................................................................
     */
    enum ProjectDayFormatting {
        /** regular day */
        NORMAL = 0,
        /** weekend day */
        WEEKEND = 1,
        /** holiday */
        HOLIDAY = 2,
        /** current day */
        TODAY = 3,
    }
    class Timeline extends HTML5Canvas {
        /** options for displaying this timeline */
        protected _options: TimelineOptions;
        readonly options: TimelineOptions;
        /** central x-position, for calculating offsets */
        private _centralDateLocation;
        /** the layer of elements */
        private _elemLayer;
        /** allow child elements to indicate that the Y dispersement should be adjusted */
        protected _needsVerticalAdjustment: boolean;
        needsVerticalAdjustment: boolean;
        /**...........................................................................
         * Create a representation of timelines
         * @param   Options to used create the timeline
         * ...........................................................................
         */
        constructor(options?: TimelineOptions);
        /**...........................................................................
         * _createDefaultOptions
         * ...........................................................................
         * create the default options for a project plan
         *
         * @returns The default options
         * ...........................................................................
         */
        protected _createDefaultOptions(): TimelineOptions;
        /**...........................................................................
         * _reconcileOptions
         * ...........................................................................
         * reconcile default options with user options
         *
         * @param   options     The options to reconcile
         * ...........................................................................
         */
        protected _reconcileOptions(options: TimelineOptions): void;
        /**...........................................................................
         * _handleCanvasForTimeline
         * ...........................................................................
         * create the canvas upon which we will be drawing our project plan
         * ...........................................................................
         */
        private _handleCanvasForTimeline();
        /**...........................................................................
         * convertDateToPoint
         * ...........................................................................
         * given a date, turn it into a point on the canvas
         * ...........................................................................
         */
        convertDateToPoint(date: Date, absolute?: boolean): IPoint;
        /**...........................................................................
         * convertPointToDate
         * ...........................................................................
         * given a point, turn it into a date on the timeline
         *
         * @param   point       The point to convert
         * @param   absolute    If true, treat the point as absolute
         * ...........................................................................
         */
        convertPointToDate(point: IPoint, absolute?: boolean): Date;
        /**...........................................................................
         * addTimelineElement
         * ...........................................................................
         * add a new project item to the canvas
         *
         * @param   item    The item to add to the canvas
         *
         * @returns True if the element can be added
         * ...........................................................................
         */
        addTimelineElement(item: TimelineElement): boolean;
        adjustVerticalPosition(): void;
        /**...........................................................................
         * _createVisibleBackground
         * ...........................................................................
         * Create the background that's currently visible
         * ...........................................................................
         */
        private _createVisibleBackground();
        /**...........................................................................
         * _getDateExtrema
         * ...........................................................................
         * calculate the max & min dates that are visible
         *
         * @returns The extremes of the dates
         * ...........................................................................
         */
        private _getDateExtrema();
        /**...........................................................................
         * _createMonthHeader
         * ...........................................................................
         * create a particular header for a month
         *
         * @param   refDate     The reference date for the month
         * @param   start       The start position
         * @param   end         The end position
         *
         * @returns The canvas group representing the month
         * ...........................................................................
         */
        private _createMonthHeader(refDate, start, end);
        /**...........................................................................
         * _createMonthLabel
         * ...........................................................................
         * Create the label for the month
         *
         * @param   refDate     The reference date for the month
         *
         * @returns The created text element
         * ...........................................................................
         */
        private _createMonthLabel(refDate);
        /**...........................................................................
         * _createMonthColor
         * ...........................................................................
         * Create the month background color
         *
         * @param   refDate     The reference date for the element
         * @param   start       The start point for the month header
         * @param   end         The end point for the month header
         *
         * @returns The created month color
         * ...........................................................................
         */
        private _createMonthColor(refDate, start, end);
        /**...........................................................................
         * _createDayHeader
         * ...........................................................................
         * create a particular header for a day
         *
         * @param   refDate     The reference date for the day
         * @param   start       Where the day should start
         *
         * @returns The created group
         * ...........................................................................
         */
        private _createDayHeader(refDate, start);
        /**...........................................................................
         * _createDayLabel
         * ...........................................................................
         * Create the text display for the day
         *
         * @param   refDate     The reference date for this date
         *
         * @returns The created text element
         * ...........................................................................
         */
        protected _createDayLabel(refDate: Date): TextElement;
        /**...........................................................................
         * _createDayBackground
         * ...........................................................................
         * Create the day background for the date header
         *
         * @param   refDate     The reference date
         *
         * @returns The created rectabgle element
         * ...........................................................................
         */
        protected _createDayBackground(refDate: Date): RectangleElement;
        /**...........................................................................
         * _createDayDivisions
         * ...........................................................................
         * create a day column
         *
         * @param   refDate     The reference date for the column
         * @param   start       The start date
         *
         * @returns The created group
         * ...........................................................................
         */
        private _createDayDivisions(refDate, start);
        /**...........................................................................
         * _getDayFormatting
         * ...........................................................................
         * Format the actual day display
         *
         * @param   date    The date to format
         *
         * @returns The formatting to use for the day
         * ...........................................................................
         */
        private _getDayFormatting(date);
        /**...........................................................................
         * _getMonthColor
         * ...........................................................................
         * Grab the appropriate color for the month
         *
         * @param   monthID     The month to get a color for
         *
         * @returns The color string for the month
         * ...........................................................................
         */
        private _getMonthColor(monthID);
    }
}
declare namespace KIP {
    type TimelineElement = TimelineGroup | TimelineEvent | Timespan | TimelineLabel;
    interface ITimelineElement {
        startDate: Date;
        endDate: Date;
    }
}
declare namespace KIP {
    class TimelineEvent extends PathElement implements ITimelineElement {
        private _date;
        startDate: Date;
        endDate: Date;
        protected _canvas: Timeline;
        constructor(id: string, date: Date);
        /** override the default canvas setting, since we need it to handle the point updates */
        canvas: Timeline;
        /** update the points for this path, based on new dimensions */
        private _setPoints();
    }
}
declare namespace KIP {
    interface ITimelineGroupOptions {
        HORIZONTAL?: boolean;
        ELEMENT_GAP?: number;
        ELEM_HEIGHT?: number;
    }
    /** create an item on the project plan */
    class TimelineGroup extends CanvasGroup implements ITimelineElement {
        /** the canvas upon which to draw the group */
        protected _canvas: Timeline;
        /** elements that make up this group */
        protected _elements: Collection<TimelineElement>;
        /** track the start date of the group */
        private _startDate;
        startDate: Date;
        /** track the end date of the group */
        private _endDate;
        endDate: Date;
        /** keep track of whether this group is collapsed */
        protected _isCollapsed: boolean;
        readonly isCollapsed: boolean;
        /** handle options for the group */
        private _options;
        /**...........................................................................
         * Creates a timeline group
         *
         * @param   id          The unique ID for the group
         * @param   options     The options to use for the group
         * ...........................................................................
         */
        constructor(id: string, options?: ITimelineGroupOptions);
        /**...........................................................................
         * _createDefaultOptions
         * ...........................................................................
         * Create the default options for the group
         * ...........................................................................
         */
        protected _createDefaultOptions(): ITimelineGroupOptions;
        /**...........................................................................
         * _reconcileOptions
         * ...........................................................................
         * reconcile the options for the group
         *
         * @param   options     The options to use for this group
         * ...........................................................................
         */
        protected _reconcileOptions(options: ITimelineGroupOptions): void;
        /**...........................................................................
         * addElement
         * ...........................................................................
         * add a new project line
         *
         * @param   elem    The element to add
         * ...........................................................................
         */
        addElement(elem: TimelineElement): void;
        /**...........................................................................
         * _reconcileDates
         * ...........................................................................
         * Assign dates and update for extrema if needed
         *
         * @param   elem    The element we are reconciling dates for
         * ...........................................................................
         */
        private _reconcileDates(elem);
        /**...........................................................................
         * _setCanvas
         * ...........................................................................
         * @param   canvas  The canvas to set
         * ...........................................................................
         */
        protected _setCanvas(canvas: Timeline): void;
        sort(sortFunc: any): void;
        public: any;
        /**...........................................................................
         * _updateLabels
         * ...........................................................................
         * update labels to my start position
         * ...........................................................................
         */
        private _updateLabels();
    }
}
declare namespace KIP {
    /**...........................................................................
     * @class TimelineLabel
     * Creates a label for a timeline element
     * @version 1.0
     * ...........................................................................
     */
    class TimelineLabel extends TextElement implements ITimelineElement {
        /** where to draw this particular label */
        private _startDate;
        startDate: Date;
        /** we don't have an end date, so just return the start date */
        endDate: Date;
        /** the canvas we are drawing upon */
        protected _canvas: Timeline;
        /**...........................................................................
         * Create a TimelineLabel
         * @param   id      Unique identifier for the label
         * @param   lbl     What text should be displayed
         * ...........................................................................
         */
        constructor(id: string, lbl: string);
        /**...........................................................................
         * _setCanvas
         * ...........................................................................
         * Override how we set the canvas for this element
         * @param canvas
         * ...........................................................................
         */
        protected _setCanvas(canvas: Timeline): void;
        /**...........................................................................
         * _updatePoint
         * ...........................................................................
         * Handle the point being updated for this element
         * ...........................................................................
         */
        protected _updatePoint(): void;
        /**...........................................................................
         * updateDimensions
         * ...........................................................................
         * Allow a caller to update the dimensions of display for this element
         *
         * @param   visibleWindow   The new window that's visible
         * ...........................................................................
         */
        updateDimensions(visibleWindow: IBasicRect): void;
    }
}
declare namespace KIP {
    interface ProjectLineSegmentOptions {
        COLOR?: string;
        FONT_SIZE?: number;
    }
    class Timespan extends RectangleElement implements ITimelineElement {
        /** track the start date of this segment */
        private _startDate;
        startDate: Date;
        /** track the end date of this segment */
        private _endDate;
        endDate: Date;
        /** canvas for the timespan */
        protected _canvas: Timeline;
        constructor(id: string, start: Date, end: Date);
        /** create the default set of options */
        private _constructDefaultOptions();
        /** override the canvas being set to find the appropriate position */
        canvas: Timeline;
        /** sets the appropriate position for the element */
        private _calculatePosition();
    }
}
declare namespace KIP {
    /** options to configure a tutorial to display as expected */
    interface TutorialOptions {
        useStandardStyles?: boolean;
        loopAround?: boolean;
        inlineMargin?: number;
    }
    interface TutorialStepOptions {
        inlineMargin?: number;
    }
    /** pair details text with a CSS class */
    interface TextClassPair {
        details: string;
        cls?: string;
    }
}
declare namespace KIP {
    /** generic class to show a tutorial step */
    class TutorialStep extends Drawable {
        /** properties of the step */
        protected _title: string;
        protected _details: TextClassPair[];
        protected _defaultDetailsClass: string;
        /** HTML element */
        protected _hilitedElement: HTMLElement;
        protected _detailContainer: HTMLElement;
        protected _parentTutorial: Tutorial;
        /** create this particular step */
        constructor(parent: Tutorial, title: string);
        /** create generic version of the createElements set */
        protected _createElements(): void;
        /** create the title for the step */
        protected _createTitle(): void;
        /** create the details container of the tutorial details */
        protected _createDetailContainer(): void;
        /** create details of the step */
        protected _createDetailElement(pair: TextClassPair): void;
        /** set the hilited element for the tutorial */
        addHilitedElement(elem: HTMLElement): void;
        /** add details to the step */
        addDetails(content: string, cssClass?: string): void;
    }
}
declare namespace KIP {
    /** display a particular screen of a tutorial */
    class TutorialScreen extends TutorialStep {
        protected _defaultDetailsClass: string;
        /** create the elements for this particular step */
        protected _createElements(): void;
        /** add a particular element to hilite */
        addHilitedElement(elem: HTMLElement, text?: string): void;
    }
}
declare namespace KIP {
    /** create the class for the actual tutorial */
    abstract class Tutorial extends Drawable {
        /** keep track of various tips / screens */
        private _steps;
        private _currentStep;
        private _options;
        /** HTML element to add steps to */
        private _stepContainer;
        /** allow a listener to listen to the tutorial closing */
        onTutorialHidden: Function;
        protected _elems: {
            base: HTMLElement;
        };
        /** create the actual tutorial class */
        constructor(options: TutorialOptions);
        /** initiailize our properties */
        private _initializeVariables();
        /** take options passed to the tutorial & reconcile with our defaults */
        private _reconcileOptions(options);
        /** create the HTML pieces of the tutorial */
        protected _createElements(): void;
        /** create the container for the individual steps */
        protected _createStepContainer(): void;
        /** adds a step to the tutorial */
        addStep(title: string, details?: string): TutorialStep;
        /** add the step we created to our internal collection */
        protected _addStepToCollection(step: TutorialStep): number;
        /** show a particular step in this tutorial */
        showStep(idx: number): void;
        /** show the next step in the tutorial */
        nextStep(): void;
        /** show the previous step in the tutorial */
        previousStep(): void;
        /** show the tutorial */
        show(): void;
        /** remove the tutorial from view */
        hide(): void;
    }
}
declare namespace KIP {
    class FullScreenTutorial extends Tutorial {
        /** allow user to jump to a particular step */
        private __navStepContainer;
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** create the elements to actually show the tutorial */
        protected _createElements(): void;
        /** creates the background element */
        private _createOverlay();
        /** create the close button for the tutorial */
        private _createCloseButton();
        /** create buttons to navigate the tutorial */
        private _createNavigationalElements();
        /** create the previous button */
        private __createPreviousBtn(parent);
        /** create the next button */
        private __createNextBtn(parent);
        /** add a particular step to the tutorial */
        addStep(title: string, details?: string): TutorialStep;
        /** show a particular step in the tutorial */
        private __addStepNavigator(idx);
    }
}
declare namespace KIP {
    /**...........................................................................
     * @class	TutorialTip
     * ...........................................................................
     * display a particular help tip for the tutorial
     * @version	1.0
     * @author	Kip Price
     * ...........................................................................
     */
    class TutorialTip extends TutorialStep {
        protected _defaultDetailsClass: string;
        private point;
        private _options;
        /** create the elements for this particular step */
        protected _createElements(): void;
        /** create the close button for inline help */
        private _createCloseButton();
        /** create the container for the buttons */
        private _createButtonContainer();
        /** create the next button for the inline help step */
        private __createNextButton(parent);
        /** create the previous button for the inline help step */
        private __createPreviousButton(parent);
        /** add a particular element to hilite */
        addHilitedElement(elem: HTMLElement): void;
        private __findAppropriatePoint();
    }
}
declare namespace KIP {
    /**...........................................................................
     * @class HelpTipTutorial
     * Creates a helptip version of a tutorial (as opposed to a full screen one
     * @version 1.0
     * ...........................................................................
     */
    class HelpTipTutorial extends Tutorial {
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** create the elements to actually show the tutorial */
        protected _createElements(): void;
        /** add a particular step to the the tutorial */
        addStep(title: string, details?: string): TutorialStep;
    }
}
declare namespace KIP {
    /**...........................................................................
     * IUnitTestElems
     * ...........................................................................
     * Elements for unit tests
     * ...........................................................................
     */
    interface IUnitTestElems extends IDrawableElements {
        testContainer: HTMLElement;
        groups: HTMLElement[];
    }
    interface IVisualTestButton {
        label: string;
        callback: Function;
    }
    interface IUnitTestDetails {
        params: any[];
        result: any;
        details: string;
    }
    class UnitTestUI extends Drawable {
        /** styles to use for this unit test */
        protected static _uncoloredStyles: Styles.IStandardStyles;
        /** elements associated with the unit test UI */
        protected _elems: IUnitTestElems;
        /**...........................................................................
         * Construct a new instance of the UnitTestUI
         * ...........................................................................
         */
        constructor();
        /**...........................................................................
         * _createElements
         * ...........................................................................
         * Create the elements needed for the drawable
         * ...........................................................................
         */
        protected _createElements(): void;
        /**...........................................................................
         * tset
         * ...........................................................................
         * State the result of whether a certain test passed or failed
         *
         * @param 	name 			The name of the assertion
         * @param 	actualResult 	What the result of the test was
         * @param 	expectedResult 	What should have been the result
         * @param 	message 		If provided, the additional message to display
         * ...........................................................................
         */
        test(name: string, actualResult: any, expectedResult: any, message?: string): void;
        /**...........................................................................
         * assert
         * ...........................................................................
         * Asserts whether the passed in evaluation is true or false
         *
         * @param 	name 			Name of the test we are running
         * @param 	pass 			Evaluation of pass
         * @param 	trueMessage 	What to show if the evaluation passes
         * @param 	falseMessage 	What to show if the evaluation fails
         * ...........................................................................
         */
        assert(name: string, pass: boolean, trueMessage?: string, falseMessage?: string): void;
        /**...........................................................................
         * startGroup
         * ...........................................................................
         * Creates a group of tests
         *
         * @param 	groupName 	The name of the group to display
         * ...........................................................................
         */
        startGroup(groupName: string): void;
        /**...........................................................................
         * testFunction
         * ...........................................................................
         *
         * @param funcToTest
         * @param title
         * @param tests
         * ...........................................................................
         */
        testFunction(funcToTest: Function, title: string, tests: IUnitTestDetails[]): void;
        /**...........................................................................
         * visualTest
         * ...........................................................................
         * @param title
         * @param buttons
         * ...........................................................................
         */
        visualTest(title: string, buttons: IVisualTestButton[]): void;
        /**...........................................................................
         * test
         * ...........................................................................
         * Check if the actual and expected results actually match
         *
         * @param actualResult 		What the test returned
         * @param expectedResult 	What the test should have returned
         *
         * @returns	True if the actual result matches the expected result
         * ...........................................................................
         */
        testEquality(actualResult: any, expectedResult: any): boolean;
        /**...........................................................................
         * _buildValueString
         * ...........................................................................
         * Build the string that will show whether the result is a match or not
         *
         * @param	pass			If true, builds the pass string
         * @param	actualResult	The value that was received
         * @param	expectedResult	The value we should have gotten
         *
         * @returns	A string that's appropriate for this test's result
         * ...........................................................................
         */
        protected _buildValueString(pass: boolean, actualResult: any, expectedResult: any): string;
        /**...........................................................................
         * _buildTestString
         * ...........................................................................
         * Creates a test element for the div
         *
         * @param	name			What to display as the name of the test
         * @param 	pass    		True if the test passed
         * @param	value_string	The value to display for a pass
         * @param 	message 		Message to display with test
         *
         * @returns	The string displaying the result of the test
         * ...........................................................................
         */
        protected _buildTestString(name: string, pass: boolean, value_string: string, message: string): string;
        /**...........................................................................
         * _passToString
         * ...........................................................................
         * Display whether the test passed or failed
         *
         * @param 	pass	True if the test passed
         *
         * @returns	Display string for the pass result
         * ...........................................................................
         */
        protected _passToString(pass: boolean): string;
        /**...........................................................................
         * _constructTestUI
         * ...........................................................................
         * Create the display elements for a test
         *
         * @param 	name 			Name of the test
         * @param 	pass 			True if the test passed
         * @param 	value_string 	The value of the test
         * @param 	message 		Optional message to go with the test
         * ...........................................................................
         */
        protected _constructTestUI(name: string, pass: boolean, value_string: string, message?: string): void;
        /**...........................................................................
         * _logTest
         * ...........................................................................
         * Adds the test to the console
         *
         * @param 	name 		Name of the test
         * @param 	pass 		True if the test passed
         * @param 	value_str 	What the test returned
         * @param 	message 	Optional messgae to go with the test
         * ...........................................................................
         */
        protected _logTest(name: string, pass: boolean, value_str: string, message?: string): void;
    }
}
declare namespace KIP {
    /**
     * Contains data that will be shown in a web element
     */
    interface IWebElementContent {
        title: string;
        details: string;
        imageURL: string;
        htmlContent: string;
    }
    class Web implements IDrawable {
        protected _elements: WebElement[];
        protected _canvas: HTML5Canvas;
        protected _parent: HTMLElement;
        constructor(parentElem?: HTMLElement, canvasOptions?: IHTML5CanvasOptions);
        addWebElement(newElem: WebElement): void;
        draw(parent?: HTMLElement): void;
        erase(): void;
        createWebElementFromContent(content: IWebElementContent): WebElement;
    }
}
declare namespace KIP {
    class WebElement implements IDrawable {
        /** the data that will be displayed inside of the web element */
        protected _content: IWebElementContent;
        content: IWebElementContent;
        /** the actual canvas element that will be created */
        protected _elem: CanvasElement;
        /** any children that should be associated with this web element */
        protected _childElements: WebElement[];
        /** any elements that should be linked to this element */
        protected _linkedElements: WebElement[];
        /** Create an element that will display in a web */
        constructor(content: IWebElementContent);
        addChildElement(child: WebElement): void;
        addLinkedElement(link: WebElement): void;
        draw(): void;
        erase(): void;
    }
}
