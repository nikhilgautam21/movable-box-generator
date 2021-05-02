import { Component, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  boxes = [];
  selectedBox:any;
  selectedBoxId:number;
  moveStep:number = 25;
  isKeyboardEventOn:boolean = true;
  intialBoxNumber:number = 15;

  constructor(){

    for(let i=0;i<this.intialBoxNumber;i++){
      this.handleAddBox();
    }

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.selectedBox && this.isKeyboardEventOn){
      switch(event.code){
        case 'KeyW':
          this.moveBoxUp();
          break;
        case 'KeyS':
          this.moveBoxDown();
          break;
        case 'KeyA':
          this.moveBoxLeft();
          break;
        case 'KeyD':
          this.moveBoxRight();
          break;
        case 'Delete':
          this.handleDelete();
          break;
      }
    }
  }

  ngOnInit(){

  }

  handleAddBox(){
    let id = (new Date()).getTime();
    this.boxes.push(id)
  }

  handleRemoveAll(){
    this.boxes = []
    this.selectedBox = null;
    this.selectedBoxId = null;
  }

  handleBoxClick(id:number){
    if(this.selectedBoxId == id){
      this.selectedBoxId = null;
      this.selectedBox = null;
    }
    else{
      this.selectedBoxId = id;
      this.selectedBox = document.getElementById(this.selectedBoxId.toString());
    }
  }

  moveBoxUp(){
    let boxStyle = this.selectedBox.style;
    let selectedTop = boxStyle.top.split("px")[0];
    if(!this.isOutOfBox('top')){
      this.selectedBox.style.top = `${Number(selectedTop) - this.moveStep}px`;
    }
  }

  moveBoxDown(){
    let boxStyle = this.selectedBox.style;
    let selectedTop = boxStyle.top.split("px")[0];
    if(!this.isOutOfBox('bottom')){
      this.selectedBox.style.top = `${Number(selectedTop) + this.moveStep}px`;
    }
  }

  moveBoxLeft(){
    let boxStyle = this.selectedBox.style;
    let selectedLeft = boxStyle.left.split("px")[0];
    if(!this.isOutOfBox('left')){
      this.selectedBox.style.left = `${Number(selectedLeft) - this.moveStep}px`;
    }
  }

  moveBoxRight(){
    let boxStyle = this.selectedBox.style;
    let selectedLeft = boxStyle.left.split("px")[0];
    if(!this.isOutOfBox('right')){
      this.selectedBox.style.left = `${Number(selectedLeft) + this.moveStep}px`;
    }
  }

  handleDelete(){
    this.selectedBoxId = null;
    this.selectedBox.remove();
  }

  handleToggleKeyboardEvent(event){
    this.isKeyboardEventOn = !this.isKeyboardEventOn
  }

  isOutOfBox(pos){
    let wrapper = document.getElementById('box-container');
    let wrapperCord = wrapper.getBoundingClientRect();
    let elemCord = this.selectedBox.getBoundingClientRect();
    switch(pos){
      case "top":
       return ((elemCord.top - this.moveStep) < wrapperCord.top); 
      case "bottom":
       return ((elemCord.top + this.moveStep) > (wrapperCord.bottom-elemCord.height)); 
      case "left":
       return ((elemCord.left - this.moveStep) < wrapperCord.left); 
      case "right":
       return ((elemCord.left + this.moveStep) > (wrapperCord.right-elemCord.height)); 
    }
  }
}
