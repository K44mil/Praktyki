import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { RoomService } from '../../_services/room.service';
import { Room } from '../../_models/room';

@Component({
  selector: 'app-rooms-table',
  templateUrl: './rooms-table.component.html',
  styleUrls: ['./rooms-table.component.scss']
})
export class RoomsTableComponent implements OnInit {

  rooms: Room[] = null;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms()
      .pipe(first())
      .subscribe(rooms => this.rooms = rooms);
  }

}
