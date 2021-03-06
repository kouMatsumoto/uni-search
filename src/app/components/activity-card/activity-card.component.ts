import { Component, Input } from '@angular/core';
import { Activity } from '../../models/neo4j';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent {
  @Input() data!: Activity;
}
