import { Component, OnInit } from '@angular/core';
import { BackEndService } from './back-end.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import { HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Fluper';
  groupForm: FormGroup;
  items: Array<any> = [];
  constructor(private fb: FormBuilder, private backEnd: BackEndService, private _snackBar: MatSnackBar) { }


  async ngOnInit() {

    this.groupForm = this.fb.group({
      keyword: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })

    this.groupForm.controls['keyword'].valueChanges.pipe(debounceTime(100)).subscribe(async data => {
      if (this.groupForm.valid) {
        data = data.toLowerCase();
        let index = this.items.findIndex(ele => ele.keyword == data);
        if (index != -1) {
          this.openSnackBar(`Result for ${data} has already been fetched`, "");
        } else {
          let result = await this.backEnd.post('http://65.0.151.219/api/fluper', undefined, new HttpParams().set("keyword", data));
          this.items.unshift(result.data);
        }
      }
    })

    let data = await this.backEnd.get('http://65.0.151.219/api/fluper', new HttpParams());
    this.items = data.data;
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }




}
