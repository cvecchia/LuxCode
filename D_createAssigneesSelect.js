function getAssignees(user_id, store_id) {
const url = 'https://losvisitwad01-be.azurewebsites.net/assignee';
const authToken = 'Basic REVWX1VTRVI6cWkkOEIyZm4=';

var assignees = [];

    var request = new XMLHttpRequest();
    request.open('GET', url + '?user_id='+user_id+'&store_id='+store_id, false);
    request.setRequestHeader('Authorization', authToken);
    request.send();
    if (request.status === 200) {
		assignees =  JSON.parse(request.response).assignees;
   	}
	request.onerror = function() {
    	console.error('An error occurred fetching the JSON from ' + url);
	};
	return assignees;

}

function createSelect(qid, assignees) {
//	var finished = "${e://Field/Finished}";
	var input = $('QR~' + qid);
//	if (!finished) {
		input.hidden = true;
        var d = document.getElementById('QR~' + qid + '~SELECT');
        if (d == null) {
        	d = document.createElement("SELECT");
            d.length = 0;

			let defaultOption = document.createElement('option');
            defaultOption.text = 'Choose Assignee';
            defaultOption.value = '';

            d.add(defaultOption);
            d.selectedIndex = 0;

            let option;
            for (let i = 0; i < assignees.length; i++) {
            	option = document.createElement('option');
                option.text = assignees[i].name +' '+assignees[i].surname;
                option.value = assignees[i].user_id;
                option.id = qid + "~" + assignees[i].user_id;
                d.add(option);
            }

            d.addEventListener("change", function() {
            	document.getElementById(input.id).value = this.value;
            });

            input.insertAdjacentElement("beforebegin", d);

        }

        if (input.value != "") {
        	document.getElementById(qid + "~" + input.value).selected = true;
        }
//	}
}
