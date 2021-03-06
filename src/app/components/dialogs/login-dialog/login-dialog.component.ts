import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppCommandService } from '../../../services/app/app-command.service';
import { AppQueryService } from '../../../services/app/app-query.service';

@Component({
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  url!: FormControl;
  user!: FormControl;
  password!: FormControl;
  form!: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<LoginDialogComponent>,
    private readonly queryService: AppQueryService,
    private readonly commandService: AppCommandService,
  ) {}

  ngOnInit() {
    const cache = this.queryService.cachedLoginInformation;

    this.url = new FormControl(cache.url, Validators.required);
    this.user = new FormControl(cache.user, Validators.required);
    this.password = new FormControl(cache.password, Validators.required);
    this.form = new FormGroup({
      url: this.url,
      name: this.user,
      password: this.password,
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.commandService.submitLoginForm({
      url: this.url.value,
      user: this.user.value,
      password: this.password.value,
    });
    this.dialogRef.close();
  }
}
