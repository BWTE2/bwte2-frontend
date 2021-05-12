import {ApiService} from "../../../shared/model/service/api-service.js";
import {domService} from "../../../shared/services/dom.service.js";

class ServerSentEventsService extends ApiService {

    async readTestTimer(testKey) {
        const url = this.rootURL + 'tests/' + testKey + '/timer';
        const source = new EventSource(url);

        source.addEventListener("timer", (event) => {
            domService.createAndEmitEvent(document, "changeTime", event.data);
            if(event.data === "0" || event.data === "inactive-test" || event.data === "invalid-key"){
                source.close();
            }
        })

        return source;
    }


    async readTestActivities(testKey) {
        const url = this.rootURL + 'tests/' + testKey + '/activities';
        //TODO: SSE readTestActivities odjeb async if necessary
    }
}

export const serverSentEventsService = new ServerSentEventsService();
