fetch('data.json').then(function (response) {
    response.json().then(function (data) {

        // Sélection des éléments
        var ul = document.getElementById("listeMusique");

        var formSection = document.querySelector(".formSection");
        var form = document.querySelector("form");
        var newobjButton = document.querySelector(".newobjButton");
        var sendbutton = document.querySelector(".sendbutton")

        var allPopup = document.querySelectorAll(".popupbox")
        var allClosepopup = document.querySelectorAll(".closepopup")
        var popupCitation = document.getElementById("citationpopup")
        var buttonCitation = document.getElementById("citationbutton")
        var confidpopup = document.getElementById("confidpopup")
        var buttonConfid = document.getElementById("confidbutton")
        var popupPlan = document.getElementById("planpopup")
        var buttonPlan = document.getElementById("planbutton")

        var message = "Aucune donnée"

        // Fonction pour créer un code HTML de base
        function createElementHTML(element) {
            ul.innerHTML = ul.innerHTML + '<li><div class="imageBouton"><div class="cover"><img src="img/icon/egaliseur1.gif" alt="gif égaliseur"></div><a href="' + element.boutonLink + '" target="_blank" class="button" title="(nouvelle fenêtre)">' + element.buttonText + '</a></div><div class="contents"><div class="titre"><button class="control">&#9205;</button><h2>' + element.title + '</h2></div><p class="cat"> - ' + element.type + ' - </p><p class="description">' + element.description + '</p><p>' + element.justification + '</p><audio class="audio" src="' + element.source + '" controls></audio><div class="creditsbox"><p class="credits">' + element.credits + '  |  <a href="' + element.buy + '" target="_blank" class="buy" title="(nouvelle fenêtre)">Acheter</a></p><a class="creditsButton">Afficher les crédits</a></div></div></li>';
        }

        // Fonction pour remplacer par le code par les valeurs variables
        function modifierHTMLcontent(element, index) {

            //application de la classz
            var li = document.querySelector("li:last-of-type");
            li.className = "element" + index;

            // Application de l'image de couverture
            var cover = document.querySelector('.element' + index + ' .cover');
            cover.style.backgroundImage = "url(" + element.cover + ")";
            cover.style.backgroundSize = "cover";
            // Modification de l'arrière-plan
            li.style.backgroundImage = "linear-gradient(to top, #" + element.color + ", #" + element.color + "99, #00000000), url(" + element.background + ")";
            li.style.backgroundSize = "cover";
            li.style.backgroundPosition = element.position;
            // Modification de la couleur du texte
            var content = document.querySelector(".element" + index + " .contents");
            var bouton = document.querySelector(".element" + index + " .control");
            content.style.color = element.text;
            bouton.style.color = element.text;
        }

        // fonction pour gérer les événements pour chaque audio
        function addAudioEventListeners() {
            const allAudios = document.querySelectorAll("audio");
            const allControls = document.querySelectorAll(".control");
            const allEgaliseur = document.querySelectorAll('.cover img');

            // définition de la fonction qui masque les égaliseurs
            function hideEg() {
                allEgaliseur.forEach(eg => eg.style.opacity = "0%");
            }
            hideEg();

            //création des événements
            data.forEach((element, index) => {
                const control = document.querySelector(`.element${index} .control`);
                const son = document.querySelector(`.element${index} .audio`);
                const egaliseur = document.querySelector(`.element${index} .cover img`);

                control.addEventListener('click', function () {
                    hideEg();
                    if (son.paused) {
                        //mettre en pause les autres sons et réinitialiser leur bouton
                        allAudios.forEach(audio => { if (audio !== son) audio.pause(); });
                        allControls.forEach(btn => { if (btn !== control) btn.innerHTML = "&#9205;"; });

                        // lancer l'audio, changer le bouton et afficher l'égaliseur
                        control.innerHTML = "&#9208;";
                        son.play();
                        egaliseur.style.opacity = "60%";
                    } else {
                        //mettre en pause l'audio et réinitialiser le bouton
                        control.innerHTML = "&#9205;";
                        son.pause();
                    }
                });

                // réinitialiser l'affichage lors de la fin de l'audio
                son.addEventListener('ended', function () {
                    control.innerHTML = "&#9205;";
                    hideEg();
                });
            });
        }

        // Fonction de la Gestion des crédits
        function creditGestion() {
            const boutonsCredits = document.querySelectorAll('.creditsButton');
            boutonsCredits.forEach((button, index) => {
                const texteCredits = document.querySelector(`.element${index} .credits`);
                texteCredits.style.display = 'none';

                button.addEventListener('click', () => {
                    const isCreditsVisible = texteCredits.style.display === '';
                    texteCredits.style.display = isCreditsVisible ? 'none' : '';
                    button.innerHTML = isCreditsVisible ? 'Afficher les crédits' : 'Masquer';
                });
            });
        }

        // Fonction de la création de tout les éléments de la liste
        function createMusicList() {
            // Réinitialiser la liste
            ul.innerHTML = '';
            data.forEach((element, index) => {
                //créer le bloc html et le modifier
                createElementHTML(element);
                modifierHTMLcontent(element, index);
            });

            // Mettre à jour les événements pour les contrôles audio
            addAudioEventListeners();
            //gérer l'affichage des crédits
            creditGestion()
        }

        // Fonction pour ajouter un nouvel élément vierge à data
        function createNewObj() {
            var newObj = {
                "title": "Aucun Titre",
                "description": "Aucune description",
                "justification": "Aucun commentaire",
                "type": "type inconnu",
                "source": "",
                "buttonText": "Bouton",
                "boutonLink": "",
                "cover": "",
                "background": "white",
                "position": "",
                "color": "",
                "text": "black",
                "credits": "Ajouter des crédits",
                "buy": ""
            };
            data.push(newObj);
            console.log("Nouvelle musique ajoutée ! Musiques au total :" + data.length);
        }

        //fonction pour réinitialiser l'état initial des champs de formulaire
        function resetFormStyle() {
            var allchamps = document.querySelectorAll("input, textarea, select")
            allchamps.forEach(element => {
                element.style.border = ''
                element.style.backgroundColor = ''
            })
        }

        // Première création de la liste
        createMusicList();

        // Masquer le formulaire par défaut
        formSection.style.display = 'none';

        // Gérer l'ouverture de la création d'un exemple
        newobjButton.addEventListener('click', function () {
            // Ajouter un nouvel élément lors du clic sur le bouton
            console.log("Ajout d'une nouvelle musique...");
            createNewObj();
            createMusicList();
            //afficher le formulaire et masquer le bouton d'ajout
            formSection.style.display = '';
            newobjButton.style.display = 'none';
        });

        // Modifier le contenu de l'exemple en temps réel
        form.addEventListener('input', function () {
            var numElement = data.length - 1;
            var element = data[numElement];

            element.title = document.getElementById("title").value;
            element.description = document.getElementById("description").value;
            element.justification = document.getElementById("justification").value;
            element.type = document.getElementById("type").value;
            element.source = document.getElementById("source").value
            element.buttonText = document.getElementById("bouton").value;
            element.boutonLink = document.getElementById("boutonLink").value;
            element.cover = document.getElementById("cover").value;
            element.background = document.getElementById("background").value;
            element.position = document.getElementById("position").value;
            element.color = document.getElementById("color").value;
            element.credits = document.getElementById("credits").value;
            element.buy = document.getElementById("buy").value;

            var textColor = document.querySelector('input[name="text"]:checked');
            if (textColor) {
                element.text = textColor.value;
            }

            // stockage des données à envoyer à l'API
            message = "Suggestion_de_Post-Titre:" + element.title + "-description:" + element.description + "-justification:" + element.justification + "-type:" + element.type + "-source_audio:" + element.source + "-texte_bouton:" + element.buttonText + "-lien_bouton:" + element.boutonLink + "-lien_couverture:" + element.cover + "-lien_arrière-plan:" + element.background + "-position_arrière-plan:" + element.position + "-couleur_arriere-plan':" + element.color + "-credits:" + element.credits + "-lien_achat:" + element.buy + "-couleur_texte:" + element.text

            //mettre à jour la liste
            createMusicList();
        });

        //gérer l'envoi du formulaire
        sendbutton.addEventListener('click', function (e) {
            e.preventDefault()
            if (form.checkValidity()) {
                //effacer le formulaire, le masquer et afficher le bouton d'ajout
                resetFormStyle()
                form.reset()
                formSection.style.display = 'none'
                newobjButton.style.display = ''

                //envoyer les donnèes avec l'API
                var urlVisitee = "http://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=verdun&courriel=philippe.gambette@u-pem.fr&message=" + message
                console.log(urlVisitee)
                fetch(urlVisitee).then(function (response) {
                    response.json().then(function (data) {
                        console.log("Réponse reçue : ")
                        console.log(data);
                    })
                })
                //signaler le succès
                alert("La suggestion d'ajout à été envoyée !");
                console.log("Suggestion d'ajout envoyée")
            } else {
                resetFormStyle()
                //indiquer les champs invalides
                var invalid = form.querySelectorAll(':invalid:not(fieldset)')
                invalid.forEach(element => {
                    element.style.backgroundColor = ' rgb(255, 190, 190)'
                    element.style.border = 'solid 3px red'
                })
                alert("Veuillez remplir tous les champs requis");
            }
        })

        //gérer l'affichage des pop-up

        //masquer par défaut
        allPopup.forEach(element => {
            element.style.display = 'none'
        })

        //pour fermer les pop-up
        allClosepopup.forEach(element => {
            element.addEventListener('click', function (e) {
                e.preventDefault()
                allPopup.forEach(popup => {
                    popup.style.display = 'none'
                })
            })
        })

        //droit de citation musicale
        buttonCitation.addEventListener('click', function (e) {
            e.preventDefault()
            popupCitation.style.display = ''
        })
        //confidentialité
        buttonConfid.addEventListener('click', function (e) {
            e.preventDefault()
            confidpopup.style.display = ''
        })
        //plan du site
        buttonPlan.addEventListener('click', function (e) {
            e.preventDefault()
            popupPlan.style.display = ''
        })
    });
});
