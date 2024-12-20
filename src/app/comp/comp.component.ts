import {  
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import {saveAs} from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

import { from, Observable, Subscription } from 'rxjs';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class CompComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {

  imageName = '';
  saveStatus = ''; // Variable to track the save status
  fileId: any | undefined;

  @ViewChild('ref', { static: true }) private el: ElementRef | undefined;
  @Input() public url?: string;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();
  private bpmnJS: any = new BpmnJS();
  accessIdValue(id: any) {
    // Do something with the ID
    if(id){
    this.fileId = id;
    this.url = 'http://localhost:8080/files/' + id.toString();}
    else{
      console.log("new");
    }
  }
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.accessIdValue(id);

    }),
    this.bpmnJS.on('import.done', ({ error }) => {
      if (!error) {
        this.bpmnJS.get('canvas').zoom('fit-viewport');
      }
    });
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  ngOnInit(): void {
    if (this.url) {
      this.loadUrl(this.url);
    }
    // ngOnInit(): void {
    //   this.route.params.subscribe(params => {
    //     const id = params['id'];
    //     if (id) {
    //       this.accessIdValue(id);
    //     } else {
    //       // If 'id' is not provided, set a default URL
    //       this.url = 'your-default-url-here';
    //       this.loadUrl(this.url);
    //     }
    //   });
    // }
    
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    if (changes['url']) {
      this.loadUrl(changes['url'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  /**
   * Load diagram from URL and emit completion event
   */
  loadUrl(url: string): Subscription {
    console.log(url);
    return (
      this.http.get(url, { responseType: 'text' }).pipe(
        switchMap((xml: string) => this.importDiagram(xml)),
        map(result => result.warnings),
      ).subscribe(
        (warnings: any) => {
          this.importDone.emit({
            type: 'success',
            warnings
          });
        },
        (err: any) => {
          this.importDone.emit({
            type: 'error',
            error: err
          });
        }
      )
    );
  }

  /**
   * Creates a Promise to import the given XML into the current
   * BpmnJS instance, then returns it as an Observable.
   *
   * @see https://github.com/bpmn-io/bpmn-js-callbacks-to-promises#importxml
   */
  private importDiagram(xml: string): Observable<{warnings: Array<any>}> {
    return from(this.bpmnJS.importXML(xml) as Promise<{warnings: Array<any>}>);
  }

  async saveXML() {
    const { xml } =  await this.bpmnJS.saveXML({ format: true });
    console.log(xml);
    var blob = new Blob([xml], {type: "blob"});
    // if (this.accessIdValue){
    //   const fileName = this.imageName || 'diagram';
    // }
    // else{
    const fileName = this.imageName || 'diagram';
    // FileSaver.saveAs(blob, `${fileName}.bpmn`);
    
    if (this.fileId) {
      const updateUrl = `http://localhost:8080/files/${this.fileId}`;
      let formData:FormData = new FormData();
      formData.append("file", blob, fileName);
      console.log(formData);
      await this.http.put(updateUrl, formData).subscribe((response: any) => {
        console.log(response);
        alert('updated');
        this.saveStatus = 'Updated';
      });}
      else{
    let testData:FormData = new FormData();
    testData.append("file", blob, fileName);
    testData.append("name", fileName);
    // testData.append(blob, string)
    console.log(testData);
    // this.http.post("http://localhost:8080/upload", testData).subscribe(response =>{
    //   console.log(response);
    // });
    this.saveStatus = 'Saving...';
    await this.http.post("http://localhost:8080/upload", testData).subscribe((response: any) => {
      console.log(response);
      alert("saved");
      this.saveStatus = 'Saved';
    });
  }
  }
}
