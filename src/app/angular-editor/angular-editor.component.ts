import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-angular-editor',
  standalone: true,
  imports: [NgIf, NgFor, AngularEditorModule, ReactiveFormsModule],
  templateUrl: './angular-editor.component.html',
  styleUrls: ['./angular-editor.component.css'],
})
export class AngularEditorComponent {
  @Input() form!: FormGroup;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['subscript', 'superscript'],
      [
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
  };
  ngAfterViewInit(): void {
    let eles = document.getElementsByClassName('angular-editor-toolbar-set');
    let ele = document.getElementById('attachmentIcon')?.innerHTML;
    let divEle = document.createElement('div');
    divEle.innerHTML = ele!;
    divEle.style.display = 'inline-block';
    divEle.style.marginLeft = '-1.2%';
    divEle.addEventListener('click', () => this.openFile());
    eles.item(eles.length - 1)?.insertAdjacentElement('afterend', divEle);
  }

  /**
   * Opens the file dialog to select files for attachment.
   */
  openFile() {
    document.getElementById('attachment')?.click();
  }

}
