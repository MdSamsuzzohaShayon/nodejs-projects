## Mailchimp to amocrm intregation

#### Click Reports Members API 
#### Requirements

 *The goal is to be able to see analytics (as described in the requirements below) of each lead in amoCRM within their respective lead card. Mail-chimp is driven by emails. Thus, the analytic generated for each email within Mailchimp should be pulled into amoCRM for each email. The analytics to be clearly displayed within each lead card on amoCRM that has an email.
 Please don't forget*

 - The last date a marketing email is opened
 - The last marketing email opened
 - Number of opened emails ever opened
 - Number of opened emails in last 30 days
 - Total Number of clicked mails (lifetime)
 - Number of clicked emails in the last 30 day
 - Thus, the analytic generated for each email within Mailchimp should be pulled into amoCRM for each email. The analytics to be clearly displayed within each lead card on amoCRM that has an email.



```
curl -X GET \
  'https://server.api.mailchimp.com/3.0/reports/{campaign_id}/click-details/{link_id}/members?fields=<SOME_ARRAY_VALUE>&exclude_fields=<SOME_ARRAY_VALUE>&count=10&offset=0' \
  -H 'authorization: Basic <USERNAME:PASSWORD>'
```

 - Campain id 98227cb61b


  ![API request](screenshots/sc-api-1.png)


 - Get whole reports using api __https://us20.api.mailchimp.com/3.0/reports/__
 - Campain details __https://us20.api.mailchimp.com/3.0/reports/98227cb61b/click-details__
 - Specefic Click details from campain __https://us20.api.mailchimp.com/3.0/reports/98227cb61b/click-details/31d5626a8e__
 - /reports/{campaign_id}/click-details/{link_id}/members


 - See example of amocrm




