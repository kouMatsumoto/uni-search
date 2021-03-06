import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as coreStore from '../../store/core.store';
import { AppState } from '../../store/core.store';
import { Neo4jRepositoryService } from '../neo4j/neo4j-repository.service';
import { AppStorageService } from '../storage/app-storage.service';
import { isNotNull } from '../util/functions';

@Injectable({
  providedIn: 'root',
})
export class AppQueryService {
  get viewType() {
    return this.store.pipe(select(coreStore.selectViewType), filter(isNotNull));
  }

  get contents() {
    return this.store.select(coreStore.selectors.selectFoundContents);
  }

  get activities() {
    return this.store.pipe(select(coreStore.selectors.selectActivityLog), filter(isNotNull));
  }

  get browseRequest() {
    return this.store.pipe(select(coreStore.selectBrowseRequest), filter(isNotNull));
  }

  get cachedLoginInformation() {
    const cache = this.storage.loadNeo4jAuth();

    return !!cache
      ? cache
      : {
          url: '',
          user: '',
          password: '',
        };
  }

  constructor(
    private readonly store: Store<AppState>,
    private readonly storage: AppStorageService,
    private readonly repository: Neo4jRepositoryService,
  ) {}

  getTotalRecordCount() {
    return from(this.repository.getTotalCount());
  }

  get isChromeExtensionNotWorking() {
    return this.store.select(coreStore.selectors.selectAppStateChromeExtension).pipe(
      filter(isNotNull),
      map((working) => !working),
    );
  }
}
