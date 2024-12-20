import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { File } from './file.model';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent{
//   compUrl = 'C:/Users/This pc/Downloads/_image.xml';

//   importError?: Error;

//   handleImported(event: Event) {

//   }
//   OnSave()
//   {
//     var canvas = document.getElementById("canvas") as HTMLCanvasElement;
//     canvas.toBlob(function(blob) {
//     saveAs(blob, "pretty image.png");
// });
//   }
fileList: any[] = [];
name: string = "";
url: string = "";
id: number;
constructor(private http: HttpClient) {{
  this.getAllFiles();
} }

getAllFiles() {
  this.http.get<Blob[]>('http://localhost:8080/files')
    .subscribe(files => {
      this.fileList = files;
    });
}

  getFileList() {
          this.getAllFiles();
}

deleteXML(id: any){
  this.id = id;
  this.http.delete(`http://localhost:8080/files/${this.id}`)
  .subscribe(() => {
    alert("deleted");
    console.log('File deleted successfully');
    this.getAllFiles(); // Refresh the file list after deletion
  });
}

}

