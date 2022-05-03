import { PersonsService } from './persons.service';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html'
})

export class PersonsComponent implements OnInit, OnDestroy {
    personList: string[] = []
    isFetching = false;
    private personListSubs: Subscription = new Subscription;

    // private personService: PersonsService

    constructor(private prsService: PersonsService) {

        // this.personList = prsService.persons
        // this.personService = prsService

    }

    ngOnInit() {
        
        this.personListSubs = this.prsService.personsChanged.subscribe(persons => {
            this.personList = persons
            this.isFetching = false
        })
        this.prsService.fetchPersons()
        this.isFetching = true

    }

    onRemovePerson(personName: string){
        this.prsService.removePerson(personName)
    }

    ngOnDestroy(): void {
        this.personListSubs.unsubscribe()
    }
}