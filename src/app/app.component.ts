import { Component } from '@angular/core';
import {SearchService} from '../app/services/search.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'opensearch-ui';
  searchtext : string;
  async searchText()
  {
    console.log(this.searchtext)
    var resp = await this.searchservices.getLuceneSearch(this.searchtext,0,25)
   
  }
  constructor(private searchservices:SearchService) {

  }
}
