function Sound(sources){

    this.audio = document.createElement("audio");

    for (var i = 0; i < sources.length; i++) {
      var source = document.createElement("source");
      source.src = sources[i];
      this.audio.appendChild(source);
    }

    this.writeOnBody = function(){
        document.body.appendChild(this.audio);
    }

    this.play = function(){
      this.audio.play();
    }
}

function Sound3D(sources,radius,scene,aditionalParams){

    var ap = aditionalParams;

    this.audio = document.createElement("audio");
    this.radius = radius;
    //Tarea, este señor no puede ser mayor a 1
    this.volume = ("volume" in ap) ? ap.volume : 1;
    this.position = ("position" in ap) ?
    new THREE.Vector3( ap.position.x, ap.position.y, ap.position.z ) :
     new THREE.Vector3( 0,0,0 );
    this.scene = scene;

    for (var i = 0; i < sources.length; i++) {
      var source = document.createElement("source");
      source.src = sources[i];
      this.audio.appendChild(source);
    }

    if("debug" in ap){
      if(ap.debug){
        this.add3DElement();
      }
    }

};

Sound3D.prototype.add3DElement = function(){
  this.mesh = new THREE.Mesh(
        new THREE.SphereGeometry(2,10,10),
        new THREE.MeshBasicMaterial({
          color: 0xFFFFFF,
          wireframe: true
        })
      );
  this.mesh.position.set(this.position.x,this.position.y,this.position.z)
  this.scene.add(this.mesh);

};
Sound3D.prototype.play = function(){
  console.log("Audio Method");
  this.audio.play();
};
Sound3D.prototype.writeOnBody = function(){
    document.body.appendChild(this.audio);
};
Sound3D.prototype.update = function(element){
    var distance = this.position.distanceTo( element.position );

    if( distance <= this.radius ){
      this.audio.volume = this.volume * ( 1 - distance / this.radius );
    }else{
      this.audio.volume = 0;
    }
}

















//espacio en blanco intencional
