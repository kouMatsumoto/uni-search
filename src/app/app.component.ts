import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogResult, LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { SearchResult } from './models/core';
import { Neo4jService } from './services/neo4j/neo4j.service';
import { UiDataService } from './services/ui/ui-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'uni-search';
  searchResults: SearchResult[] = [];
  selected: { href: string } | null = null;

  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly uiDataService: UiDataService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.dialog
      .open(LoginDialogComponent)
      .afterClosed()
      .subscribe((value: DialogResult) => {
        console.log(value);
      });

    this.uiDataService.command.subscribe((command: string) => {
      this.selected = { href: `https://www.google.com/search?q=${command}` };
    });

    this.uiDataService.searchResults.subscribe((results) => {
      this.searchResults = results;
    });
  }

  async onItemSelect(data: SearchResult) {
    this.selected = data;

    // developing cypher-query
    await this.neo4jService.forSelectedItem(data);
  }
}
