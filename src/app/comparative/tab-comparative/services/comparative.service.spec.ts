import { TestBed, async, inject } from '@angular/core/testing';
import { ComparativeService } from './comparative.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Post', () => {
 beforeEach(() => {
   TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
     providers: [ComparativeService]
   });
 });

 it('service Tab-Comparative', inject([ComparativeService], (service: ComparativeService) => {
   expect(service).toBeTruthy();
 }));
});