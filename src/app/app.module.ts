import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CookieModule } from 'ngx-cookie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule,MatInputModule,MatRadioModule,MdDialog,MatGridListModule,MatButtonModule,MatIconModule,MatTableModule,MatCardModule, MatDialogModule,MatChipsModule,MdButtonModule,MdDialogRef,MdSnackBar, MdCheckboxModule, MatSnackBarModule, MatSelectModule} from '@angular/material';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account/account.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { LoginService } from './login/login.service';
import { CookieService } from 'ngx-cookie';
import { FormService } from './form/form.service';
import { FormDetailService } from './form-detail/form-detail.service';
import { AuthGuard } from './auth-guard/auth.guard';

import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { FormDetailComponent, DialogDataExampleDialog } from './form-detail/form-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        AccountComponent,
        UserComponent,
        LoginComponent,
        FormComponent,
        FormDetailComponent,
        DialogDataExampleDialog
    ],
    imports: [
        FormsModule,
        HttpModule,
        BrowserModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        CarouselModule,
        CookieModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdCheckboxModule,
        MatRadioModule,
        MatCardModule,
        MatChipsModule,
        MatTableModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatGridListModule,
        MatInputModule,
        MatSnackBarModule,
        MatSelectModule,
        RouterModule.forRoot ([
            { path: 'user', component: UserComponent, canActivate: [ AuthGuard ] },
            { path: 'form', component: FormComponent, canActivate: [ AuthGuard ] },
            { path: 'form-detail', component: FormDetailComponent, canActivate: [ AuthGuard ]},
            { path: 'account' , component : AccountComponent, canActivate: [ AuthGuard ]},
            { path: 'login' , component : LoginComponent},
            { path: 'user/:id' , component : UserComponent,canActivate: [ AuthGuard ]},
            { path: '' , redirectTo : '/login', pathMatch: 'full' },
            { path: '**', redirectTo: '/login', pathMatch: 'full' }
        ],{useHash: true}),
        ModalModule.forRoot(),
        AlertModule.forRoot()
    ],
    entryComponents: [DialogDataExampleDialog],
    providers: [AccountService,
                UserService,
                AppService,
                LoginService,
                CookieService,
                FormService,
                FormDetailService,
                AuthGuard
               ],
    bootstrap: [AppComponent]
})
export class AppModule { }
