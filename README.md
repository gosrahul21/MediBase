Introduction
Medibase is the project in which any patient can be prescribed by only verified doctors digitally from anywhere with his secured database of past medical history.
With the medical history report of patient stored digitally, patient will not carry its medical history from one doctor to another. Medical History will have all the medicines prescribed, problem of the patient, date and time user prescribed and the doctor details .
With the help of medical history, it also increases the scope to apply machine learning to predict and recommend patient about their medical health.
Any doctor can prescribed the patient only when he has been granted to prescribe by the patient.
How Medibase is secure?
Medibase allow each doctor to be verified by the details of information provided by the doctor and its background check.
If the doctor is verified then only he will be allowed to prescribe any patient.
Verified doctors have green tick on their name which make them verified.
We have added middleware which perform all required check to be done before any operations.

There are two type of request which any user can send /receive.
1.	Read  request 
2.	Prescribe request 

Read request
Any patient can send read request to his friends/acquaintance. Person granted only read permission will only be allowed to view the medical records and profile of the user.
Verified Doctors and unverified doctors can also send read request.
Prescribe request
Only verified doctors can send prescribe request to the patient. Prescribed doctors are allowed to make any prescribe the patient and view their profile and medical history for better understanding.
Realtime
This is a realtime application and user will not have to refresh his page in order to check if there is any notification or new prescription.
Realtime functionality has been added by implementing socket.io.
