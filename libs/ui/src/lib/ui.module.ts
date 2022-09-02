import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { TableWrapperComponent } from './table/table-wrapper/table-wrapper.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { UploaderComponent } from './uploader/uploader.component';
import { InternationPhoneInputComponent } from './internation-phone-input/internation-phone-input.component';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule],
  declarations: [
    CardComponent,
    TableWrapperComponent,
    NavItemComponent,
    IconComponent,
    InputComponent,
    ButtonComponent,
    UploaderComponent,
    InternationPhoneInputComponent,
    ToggleComponent,
  ],
  exports: [
    CardComponent,
    IconComponent,
    NavItemComponent,
    InputComponent,
    ButtonComponent,
    UploaderComponent,
    InternationPhoneInputComponent,
    ToggleComponent,
  ],
})
export class UiModule {}
