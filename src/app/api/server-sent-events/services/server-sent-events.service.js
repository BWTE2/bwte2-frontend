import {ApiService} from "../../../shared/model/service/api-service.js";

class ServerSentEventsService extends ApiService {

    async readTestTimer(testKey) {
        const url = this.rootURL + 'tests/' + testKey + '/timer';
        //TODO: SSE readTestTimer odjeb async if necessary
    }

    async readTestActivities(testKey) {
        const url = this.rootURL + 'tests/' + testKey + '/activities';
        //TODO: SSE readTestActivities odjeb async if necessary
    }
}

export const serverSentEventsService = new ServerSentEventsService();
