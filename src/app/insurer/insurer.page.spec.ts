import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsurerPage } from './insurer.page';

describe('InsurerPage', () => {
  let component: InsurerPage;
  let fixture: ComponentFixture<InsurerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsurerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
