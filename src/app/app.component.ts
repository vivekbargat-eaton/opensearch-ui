import { Component, OnInit } from '@angular/core';
import { SearchService } from '../app/services/search.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'opensearch-ui';
  searchtext: string;
  hits: any[];
  keys: any[];

  async searchText() {
    var resp = await this.searchservices.getLuceneSearch(
      this.searchtext,
      0,
      25
    );

    if (resp && resp.hits?.hits) {
      this.hits = resp.hits.hits;
    }
  }

  constructor(private searchservices: SearchService) {}

  async ngOnInit(): Promise<void> {
    var resp = await this.searchservices.getIndexMapping('recipes');

    if (resp && resp) {
      this.keys = Object.keys(resp.recipes.mappings.properties);
    }
  }
}
