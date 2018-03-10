namespace BST {

	export interface ICurrentShowElems extends IViewElements {
		base: HTMLElement;
		details: HTMLElement;
		sidebar: HTMLElement;
		photo: HTMLElement;
	}
	/**...........................................................................
	 * @class CurrentShowView
	 * View to display for the upcoming show display
	 * @version 1.0
	 * ...........................................................................
	 */
	export class CurrentShowView extends View {

		protected _bubbleReference: number;
		public set bubbleReference(bbl: number) {
			this._bubbleReference = bbl;
		}

		protected _header: BSTHeader;

		protected _elems: ICurrentShowElems;
		public set sidebar(elem: HTMLElement) { this._elems.sidebar = elem; this._onResize(); }

		protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
			".currentShow": {
				width: "100%",
				height: "100%",
				position: "absolute",
				left: "0",
				top: "0",
				maxHeight: "100%",
				overflow: "hidden",
				pointerEvents: "none"
			},

			".currentShow.mobile": {
				paddingTop: "0"
			},

			".seasons": {
				width: "100%",
				height: "100%",
				position: "fixed",
				left: "0",
				top: "0",
				marginTop: "0"
			},

			".seasons + div": {
				marginTop: "100%"
			},

			".currentShow .wrapper": {
				width: "100%",

				nested: {
					"&.placeholder": {
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",

						nested: {
							"img": {
								width: "50% !important",
								height: "auto !important",
								marginLeft: "0 !important",
								marginTop: "0 !important",
							},

							"&:after": {
								content: "'Image Coming Soon'",
								fontFamily: "OpenSansLight",
								color: "rgba(255,255,255,.5)",
								fontSize: "2em"
							}
						}
					},


					"img": {
						width: "100%",
						height: "auto"
					}
				}
			},

			".currentShow .currentShowDetails": {
				backgroundColor: "#FFF",
				borderRadius: "4px",
				boxShadow: "1px 1px 8px 4px rgba(0,0,0,.2)",
				position: "absolute",
				top: "178px",
				left: "42px",
				padding: "6px",
				paddingLeft: "20px",
				paddingRight: "10px",
				boxSizing: "border-box",
				fontFamily: "OpenSansLight"
			},

			".mobile .currentShow .currentShowDetails": {
				width: "100%",
				fontSize: "2em",
				left: "0",
				textAlign: "center",
				top: "calc(8vw - 20px)"
			},

			".currentShow .currentShowDetails.hidden": {
				opacity: "0",
				display: "block"
			},

			".mobile .currentShow .currentShowDetails.hidden": {
				opacity: "1",
				display: "block"
			},

			".currentShowDetails .infoTitle": {
				fontSize: "2em",
				fontFamily: "OpenSansBold"
			},

			".currentShowDetails .infoSubtitle": {
				fontSize: "1em",
				fontFamily: "OpenSans",
				lineHeight: "0.8",
				marginBottom: "10px",
				opacity: "0.65"
			},

			".currentShowDetails .dates": {
				fontSize: "1.2em"
			},

			".currentShowDetails .writerDirector": {
				marginTop: "0.5em"
			},

			".currentShowDetails .buttons": {
				display: "flex",
				width: "100%",
				marginTop: "1.5em",
				pointerEvents: "all"
			},

			".mobile .currentShowDetails .buttons": {
				marginTop: "1em",
			},

			".currentShowDetails .buttons .btn": {
				backgroundColor: "#FC0",
				color: "#000",
				padding: "8px 5px",
				borderRadius: "2px",
				cursor: "pointer",
				marginRight: "8px",
				width: "50%",
				textAlign: "center",
				fontFamily: "OpenSansBold",
				whiteSpace: "nowrap"
			},

			".mobile .currentShowDetails .buttons .tix, .mobile .currentShowDetails .writerDirector, .mobile .currentShowDetails .dates": {
				display: "none"
			},

			".mobile .currentShowDetails .buttons .details": {
				width: "100%",
				fontSize: "1.2em"
			},

		}

		/** set the appropriate ID for this show */
		public set showID(showID: string) {
			this._loadShowData(showID);
		}

		/**...........................................................................
		 * Create the view that displays the current show
		 * 
		 * @param	showId	The show that we are creating
		 * ...........................................................................
		 */
		constructor(header: BSTHeader, showId?: string) {
			super();
			this._header = header;
			//this._header.registerListener(()=> { this._onResize(); });
			if (showId) { this._loadShowData(showId); }
		}

		/**...........................................................................
		 * _createElements
		 * ...........................................................................
		 * Create the elements for 
		 * ...........................................................................
		 */
		protected _createElements(): void {
			this._elems.base = KIP.createSimpleElement("", "currentShow");
		}

		/**...........................................................................
		 * _shouldSkipCreateElements
		 * ...........................................................................
		 * Make sure we can cretae elements
		 * ...........................................................................
		 */
		protected _shouldSkipCreateElements(): boolean { return false; }

		/**...........................................................................
		 * _loadShowData
		 * ...........................................................................
		 * Call to the server to show the actual show data
		 * 
		 * @param	showId	The ID that represents the show
		 * ...........................................................................
		 */
		private _loadShowData(showId: string): void {
			Server.loadShow(
				showId,
				(data: Show) => {
					this._createShowUI(data);
				},
				(data: string) => {
					this._onError();
				}
			);
		}

		/**...........................................................................
		 * _onError
		 * ...........................................................................
		 * Handle the case where we can't actually get the show data loaded
		 * ...........................................................................
		 */
		private _onError(): void {
			this._elems.base.innerHTML = ""; // TODO: make a ?? screen

			// err form

			let errForm: KIP.ErrorPopup = new KIP.ErrorPopup("The details about this show couldn't be found");
			errForm.draw(document.body);
		}

		/**...........................................................................
		 * _createshowUI
		 * ...........................................................................
		 * Create the UI needed for the current show
		 * 
		 * @param 	show 	The show that should be displayed
		 * ...........................................................................
		 */
		private _createShowUI(show: Show): void {

			if (!this._elems.base) {
				this._createElements();
			}

			this._elems.base.innerHTML = "";
			let photoElem: HTMLElement = this._createShowPhoto(show);
			let info: HTMLElement = this._createShowDetails(show);
			this._elems.base.appendChild(photoElem);
			this._elems.base.appendChild(info);
		};

		/**...........................................................................
		 * _createShowPhoto
		 * ...........................................................................
		 * Create the main photo display for the loaded show
		 * 
		 * @param 	show 	The show to create photos for
		 * 
		 * @returns	The created photo element
		 * ...........................................................................
		 */
		private _createShowPhoto(show: IShowData): HTMLElement {
			let cls: string = "wrapper";
			// find the appropriate URL
			let photoURL: string = this._getPhotoURL(show);

			if (!photoURL) {
				photoURL = "./img/home/broomstreetname.noisy.white.png";
				cls += " placeholder"
			}

			// create the 
			let photoView: HTMLElement = KIP.createElement({
				type: "img",
				attr: {
					"src": photoURL
				}
			});

			let wrapper: HTMLElement = KIP.createElement({cls: cls, children: [photoView]});

			window.setTimeout(() => {
				this._resizePhotoIfNeeded();
			});

			this._elems.photo = photoView;
			return wrapper;
		}

		private _resizePhotoIfNeeded(): void {

			if (this._elems.photo.offsetHeight <= 1) {
				window.setTimeout(() => { this._resizePhotoIfNeeded(); });
				return;
			}

			if ((this._elems.photo.offsetHeight + this._elems.photo.offsetTop) < window.innerHeight) {
				let ratio: number = this._elems.photo.offsetWidth / this._elems.photo.offsetHeight;
				this._elems.photo.style.width = "auto";
				let dy: number = (window.innerHeight - this._elems.photo.offsetTop);
				this._elems.photo.style.height = dy + "px";


				let adjustX: number = ((dy * ratio) - window.innerWidth) / 2;
				console.log(KIP.format("dy: {0}, ratio: {1}, innerWidth: {2}, adjustX: {3}", dy, ratio, window.innerWidth, adjustX))
				this._elems.photo.style.marginLeft = (-1 * adjustX) + "px";

			}
		}

		/**...........................................................................
		 * _getPhotoURL
		 * ...........................................................................
		 * The URL for photos for the show
		 * 
		 * @param 	show 	The show to load photos for
		 * 
		 * @returns	The URL for the photos
		 * ...........................................................................
		 */
		private _getPhotoURL(show: IShowData): string {
			let photoURL: string;
			let photo: IPhoto;

			for (photo of show.photos) {
				if (photo.isHilite) {
					photoURL = photo.url;
					break;
				}
			}

			return photoURL;
		}

		/**...........................................................................
		 * _createShowDetails
		 * ...........................................................................
		 * Create details for the particular show we are showing
		 * 
		 * @param	show	The show to create details for
		 * 
		 * @returns	The created element with all of the show details
		 * ...........................................................................
		 */
		private _createShowDetails(show: Show): HTMLElement {
			let showTitle: HTMLElement = KIP.createSimpleElement("", "infoTitle", show.showTitle.title);
			let showSubTitle: HTMLElement = KIP.createSimpleElement("", "infoSubtitle", show.showTitle.subtitle);

			let run: IRun = show.run;
			let showDates: HTMLElement = KIP.createSimpleElement("", "dates", KIP.Dates.shortDate(run.start) + " - " + KIP.Dates.shortDate(run.end));
			let showAuthor: HTMLElement = this._createWriterAndDirectorDetails(show.showTitle);
			let buttons: HTMLElement = this._createButtons(show);


			this._elems.details = KIP.createSimpleElement("", "currentShowDetails hidden", "", null, [showTitle, showSubTitle, showDates, showAuthor, buttons]);
			if (this._bubbleReference) {
				window.setTimeout(() => {
					this._onResize();
				}, 0);
			}
			if (!this._isMobile) {
				window.setTimeout(() => {
					KIP.removeClass(this._elems.details, "hidden")
					KIP.transition(
						this._elems.details,
						{ opacity: "0" },
						{ opacity: "1" },
						500
					);
				}, 10);
			}
			return this._elems.details;
		}

		/**...........................................................................
		 * _createWriterAndDirectorDetails
		 * ...........................................................................
		 * Create details about who wrote / is directing the show
		 * 
		 * @param 	showTitle 	The title of the show details
		 * 
		 * @returns	The created details
		 * ...........................................................................
		 */
		private _createWriterAndDirectorDetails(showTitle: IShowTitleDetails): HTMLElement {
			let writerDirectorBox: HTMLElement = KIP.createSimpleElement("", "writerDirector");
			if (showTitle.writer !== showTitle.director) {
				let writer: HTMLElement = KIP.createSimpleElement("", "writer", "Written by: " + showTitle.writer, null, null, writerDirectorBox);
				let director: HTMLElement = KIP.createSimpleElement("", "director", "Directed by: " + showTitle.director, null, null, writerDirectorBox);
			} else {
				writerDirectorBox.innerHTML = "Written and Directed by: " + showTitle.writer;
			}

			return writerDirectorBox;
		}

		/**...........................................................................
		 * _createButtons
		 * ...........................................................................
		 * Create the buttons that allow the user to hop into the detailed show view
		 * 
		 * @param 	show	The show that the buttons that should be created for 
		 * 
		 * @returns	The element containing the created buttons
		 * ...........................................................................
		 */
		private _createButtons(show: IShowData): HTMLElement {
			let buttons: HTMLElement = KIP.createSimpleElement("", "buttons");

			let detailsBtn: HTMLElement = KIP.createSimpleElement("", "btn details", "DETAILS", null, null, buttons);
			detailsBtn.addEventListener("click", () => {
				navigate(show.showTitle.id, NavigationType.SHOW);
			});

			let today: Date = KIP.Dates.getToday();
			let run: IRun = Helpers.getShowStartAndEndDates(show);
			if (today <= run.end) {
				let tixBtn: HTMLElement = KIP.createSimpleElement("", "btn tix", "GET TICKETS", null, null, buttons);
				tixBtn.addEventListener("click", () => {
					navigate(show.showTitle.id, NavigationType.SHOW);
				});
			}

			return buttons;
		}

		/**...........................................................................
		 * _createErrorMessage
		 * ...........................................................................
		 * Show an error if there is no show data to load
		 *  
		 * @returns	The element that created
		 * ...........................................................................
		 */
		private _createErrorMessage(): HTMLElement {

			let errorTitle: HTMLElement = KIP.createSimpleElement("", "errTitle", "Uh-oh...something happened");
			let errorDetails: HTMLElement = KIP.createSimpleElement("", "errDetails", "Looks like we haven't yet added details about this show.");

			let errorMsg: HTMLElement = KIP.createSimpleElement("", "error", "", null, [errorTitle, errorDetails]);
			return errorMsg;
		}

		protected _onResize(): void {
			if (!this._bubbleReference) { return; }
			if (this._isMobile) {
				window.setTimeout(() => {
					//this._elems.details.style.top = (this._elems.sidebar.offsetTop + this._elems.sidebar.offsetHeight) + "px";
					this._elems.sidebar.style.paddingTop = (this._header.base.offsetHeight - 4) + "px";
					this._elems.details.style.top = (this._elems.sidebar.offsetTop + this._elems.sidebar.offsetHeight) + "px";
					this._elems.photo.style.marginTop = (this._elems.details.offsetTop + this._elems.details.offsetHeight) + "px";
				}, 100);

			} else {

				let top: number = (this._bubbleReference - (this._elems.details.offsetHeight / 2));
				let diff: number = (window.innerHeight - (top + this._elems.details.offsetHeight) - 10);
				if (diff < 0) { top += diff; }
				if (top < this._header.base.offsetHeight) { top = this._header.base.offsetHeight; }
				this._elems.details.style.top = top + "px";
			}

			this._resizePhotoIfNeeded();
		}
	}
}