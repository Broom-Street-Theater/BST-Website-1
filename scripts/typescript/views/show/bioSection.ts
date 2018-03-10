namespace BST {
    export class BioSection extends SectionView {

        /** keep track of the bio data for this section */
        protected _data: IBioData[];

        /** keep track of styles for the section */
        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".section.bios:not(.mobile)": {
                paddingLeft: "25%",
                paddingRight: "20%"
            },
            
            ".section.bios .sectionContent .bioSubsection": {
                display: "flex",
                flexWrap: "wrap",
                marginLeft: "-120px"
            },

            ".section.bios .tabContainer": {
                justifyContent: "flex-start"
            },

            ".section.bios .tabContainer .tab": {
                paddingRight: "5%",
                boxSizing: "border-box"
            }
        }

        /**...........................................................................
         * _createElements (protected)
         * ...........................................................................
         * Creates all elements needed in the bio section
         * ...........................................................................
         */
        protected _createSectionElements (): void {
            let bio: IBioData;

            let content: SubSections = new SubSections();

            // sort the bios by type
            let castBios: IBioData[] = [];
            let crewBios: IBioData[] = [];
            let specialBios: IBioData[] = [];
            
            // split out each of the bio lists
            for (bio of this._data) {
                switch (bio.type) {
                    case CastOrCrew.CREW:
                        crewBios.push(bio);
                        break;
                    case CastOrCrew.SPECIAL_MENTION:
                        specialBios.push(bio);
                        break;
                    default: 
                        castBios.push(bio);
                        break;
                }
            }

            if (castBios.length > 0) { 
                let castSubsection: BioSubsection = new BioSubsection(castBios, "CAST");
                content.addSubSection(castSubsection);
            }

            if (crewBios.length > 0) {
                let crewSubsection: BioSubsection = new BioSubsection(crewBios, "CREW");
                content.addSubSection(crewSubsection);
            }

            if (specialBios.length > 0) {
                let specialSubsection: BioSubsection = new BioSubsection(specialBios, "SPECIAL MENTIONS");
                content.addSubSection(specialSubsection);
            }

            this._elems.content.appendChild(content.base);
        }
    }

    export class BioSubsection extends SubSection<IBioData[]> {
        protected _data: IBioData[];

        protected static _uncoloredStyles: KIP.Styles.IStandardStyles = {
            ".bio": {
                display: "flex",
                width: "calc(50% - 10px)",
                boxSizing: "border-box",
                marginBottom: "20px",
                marginRight: "10px",
                minHeight: "0px"
            },

            ".mobile .bio": {
                width: "calc(100% - 10px)",
                paddingLeft: "100px"
            },

            ".mobile.bios .subsectionContent": {
                borderLeft: "none"
            },
            
            ".bio .bioImage": {
                borderRadius: "100px",
                width: "100px",
                minWidth: "100px",
                height: "100px",
                minHeight: "100px",
                overflow: "hidden",
                marginRight: "20px",
                backgroundColor: "#FFF"
            },
            
            ".bio .bioImage > img": {
                width: "100%",
                height: "auto"
            },
            
            ".bio .bioData .names": {
                display: "flex",
                fontSize: "1.4em",
                alignItems: "baseline"
            },

            ".mobile .bio .bioData .names": {
                flexWrap: "wrap"
            },
            
            ".bio .bioData .names .actor" : {
                fontFamily: "OpenSans",
                marginRight: "20px"
            },

            ".mobile .bio .bioData .names .actor": {
                
            },
            
            ".bio .bioData .names .actor a": {
                margin: "0",
                padding: "0",
                display: "inline-block"
            },
            
            ".bio .bioData .names .actor .link:after": {
                backgroundImage: "url('http://icons.veryicon.com/ico/System/iOS7%20Minimal/Debug%20External%20link.ico')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "18px 18px",
                content: "''",
                width: "18px",
                height: "18px",
                marginLeft: "6px",
                display: "inline-block",
                opacity: "0.5"
            },
            
            ".bio .bioData .names:hover .actor:after": {
                opacity: "1"
            },
            
            ".bio .bioData .names .role" : {
                fontFamily: "OpenSansLight",
                fontStyle: "italic"
            },

            ".mobile .bio .bioData .names .role":{
                fontSize: "0.8em"
            },
            
            ".bio .bioData .bioText" : {
                fontSize: "0.9em"
            },
            
            ".bio a": {
                color: "#333",
                fontSize: "0.9em",
                padding: "0",
                margin: "0",
                marginTop: "10px",
                display: "block"
            }
        }

        protected _getUncoloredStyles(): KIP.Styles.IStandardStyles { return this._mergeThemes(BioSubsection._uncoloredStyles, SubSection._uncoloredStyles); }

        protected _createContent():void {
            this._elems.content = KIP.createElement({
                cls: "bioSubsection"
            });

            let bio: IBioData;
            for (bio of this._data) {
                let miniBio: HTMLElement = this._createBio(bio);
                this._elems.content.appendChild(miniBio);
            }
        }

        /**...........................................................................
         * _afterDraw
         * ...........................................................................
         * Handle adjusting the height after the elements have actually been rendered
         * ...........................................................................
         */
        protected _afterDraw(): void {
            let maxHeight: number = 0;
            let bio: IBioData;
            let bioCollection: NodeList = this._elems.content.childNodes;

            // loop through the bio elements we need
            for (let idx = 0; idx < bioCollection.length; idx += 1) {
                let miniBio: HTMLElement = bioCollection[idx] as HTMLElement;
                if (miniBio.offsetHeight > maxHeight) { maxHeight = miniBio.offsetHeight; }
            }

            // adjust the height of the bios to at least be as large as the largest among them
            console.log("maxHeight: " + maxHeight);
            KIP.setProperty(".bio", "min-height", maxHeight + "px", true);
        }

        /**...........................................................................
         * _createBio (protected)
         * ...........................................................................
         * create a bio for a member of the show
         * 
         * @param   bio     The bio to create HTML elements for
         * 
         * @returns HTML Element containing the elements needed for the bio
         * ...........................................................................
        */
        private _createBio (bio: IBioData): HTMLElement {
            let bioWrapper: HTMLElement = this._createBioContent(bio);                                                          // content + name
            let imageWrapper: HTMLElement = this._createBioImage(bio);                                                          // image
            let bioElem: HTMLElement = KIP.createSimpleElement(this._id + "|bio", "bio", "", null, [imageWrapper, bioWrapper]); // overall element
            return bioElem;
        }

        /**...........................................................................
         * _createBioNames (protected)
         * ...........................................................................
         * create just the name elements of the bio 
         * 
         * @param   bio     The bio to create names for
         * 
         * @returns The name elements for the bio
         * ...........................................................................
         */
        private _createBioNames (bio: IBioData): HTMLElement {
            let actorNameElem: HTMLElement = KIP.createSimpleElement(this._id + "|actor", "actor");
            let linkText: HTMLElement;
            if (bio.website) {
                linkText = KIP.createElement({
                    type: "a",
                    attr: {
                        href: bio.website
                    },
                    content: bio.actorName,
                    cls: "link"
                });
            } else {
                linkText = KIP.createElement({
                    cls: "nolink",
                    content: bio.actorName
                });
            }
            actorNameElem.appendChild(linkText);

            let roleNameElem: HTMLElement = KIP.createSimpleElement(this._id + "|role", "role", bio.roleName);
            let namesWrapper: HTMLElement = KIP.createSimpleElement(this._id + "|names", "names", "", null, [actorNameElem, roleNameElem]);

            return namesWrapper;
        }

        /**...........................................................................
         * _createBioContent (protected)
         * ...........................................................................
         *  Create the content of the bio 
         * 
         * @param   bio     The bio to create content for
         * 
         * @returns The content elements for the bio
         * ...........................................................................
         */
        private _createBioContent (bio: IBioData): HTMLElement {
            let namesWrapper: HTMLElement = this._createBioNames(bio);
            let bioText: HTMLElement = KIP.createSimpleElement(this._id + "|bioText", "bioText", bio.bio);
            let bioWrapper: HTMLElement = KIP.createSimpleElement(this._id + "|bioData", "bioData", "", null, [namesWrapper, bioText]);
            return bioWrapper;
        }

        /**...........................................................................
         * _createBioImage (protected)
         * ...........................................................................
         * create the image associated with the bio 
         * 
         * @param   bio     The bio to create an image for
         * 
         * @returns The created image element for the bio
         * ...........................................................................
         */
        private _createBioImage (bio: IBioData): HTMLElement {

            let imageWrapper: HTMLElement = KIP.createSimpleElement(this._id + "|bioImage", "bioImage");
            let imageElem: HTMLElement = KIP.createElement({
                type: "img",
                attr: {
                    src: bio.imageURL
                },
                parent: imageWrapper
            });

            return imageWrapper;
        }
    }
}