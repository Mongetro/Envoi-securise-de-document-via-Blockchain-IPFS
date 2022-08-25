# Envoisecurisé de document via Blockchain & IPFS

Cette preuve de concept concernen l'envoi sécurisé de document comme une lettre de voiture via la Blockchain avec IPFS.

# Pérequis: 
NodeJs 14 => https://nodejs.org/
- Truffle 5 => https://trufflesuite.com/docs/truffle/quickstart/
- Ganache => https://trufflesuite.com/ganache/
- Metamask => https://metamask.io/

# 2. Déploiement de la preuve de concept 
- Importez les comptes de ganache dans Metamask, comme indiqué dans la vidéo suivante: https://www.youtube.com/watch?v=con8UhF_fVU
- Ouvrir un terminal, se positionner dans le dossier du projet puis de taper la commande npm install afin d’installer toute les dépendances nécessaires, définies dans le fichier package.json. Ensuite, l’application sera prête à être déployée.

Ci-dessous, sont décrites les différentes étapes de déploiement de notre preuve de concept :

1- Démarrez la blockchain avec laquelle va interagir l’application. Dans notre cas, nous utilisons ganache par exemple, donc il nous suffit juste de le lancer et de cliquer sur QUICKSTART ; L'inconvénient est qu'à chaque démarrage de Ganache, il faudra ré-importer les comptes Ethereum dans Metamask.

On peut aussi créer un nouveau Workspace ainsi on pourra systématiquement utiliser ce même Workspace associé à notre projet. Les comptes Ethereum de Ganache pourront être importés une seule fois dans Metamask.
Il est bon de noter qu’à chaque fois que l’émulateur ganache est relancé, il ne garde aucune trace des smart contacts qui y ont été déployés, sauf si on a créé et enregistré un espace de travail. Donc, il est nécessaire de recompiler et de redéployer les « smart contracts » à chaque relance de ganache.


2- Lancez un terminal, puis se positionner dans le dossier du projet ;


3- Attachez la console truffle à l’émulateur ganache via la commande truffle console --network ganache ; Vous êtes maintenant connectés à la console truffle :
truffle(ganache)>


4- Compiler et déployer les « smart contracts » (cf. figure précédente) sur la blockchain avec la commande migrate --compile-all ;
N.B : Pour des contrats qui ont été déjà déployés sur la blockchain, si on y apporte des modifications par exemple, il faut les recompiler et les redéployer en ajoutant --reset à la commande précédente. La commande deviendra alors : migrate --compile-all --reset

5- Assurez-vous que le réseau private network (celui dans lequel les comptes ganaches ont été emportés) soit sélectionné dans metamask, puis sélectionnez un compte.
6- Lancez un nouveau terminal, puis positionnez-vous à nouveau dans le dossier du projet
7- Lancez le client web via la commande npm start. L’interface web doit apparaître 
8- Maintenant remplissez les champs (même s’ils ne sont pas encore pris en compte dans l’action effectuée par le bouton Submit) et choisissez le fichier à envoyer, puis cliquez sur le bouton Submit. Vous recevrez une demande de confirmation de la transaction dans metamask :
