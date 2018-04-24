:warning: = Breaking change

## 0.4.1
##### 2018-Apr-24
* Add community resources:
  * Brasilia Telegram (#112)
  * Facebook, Twitter, OSMF, and help.openstreetmap.com (#103)
  * Korean Telegram (#110)
  * UK East and West Midlands meetups, talk-gb and irc channel (#102, #107)
  * OSM Graz (#106)
  * talk-it-trentino and talk-it-southtyrol mailing lists (#104, #105)
  * Berlin, Germany (#100)
  * Italy (#99)
  * Bolivia (#98)
  * Peru (#97)
  * Austria web forum (#96)
  * Sweden (#87, #95)
  * Norway (#94)
  * Updates to Argentina resources (#91, #92)
  * Puducherry, India (#89)
  * Malaysia (#86)
  * Colombia (#85)
  * Ghana (#84)
  * France (#83)
  * Spain talk-es (#81)
  * Belgium meetup groups (#76)
  * Myanmar (#75)
* Add events:
  * Brazilian meetups (#113)
  * State of the Map World
  * State of the Map Asia (#88)


## 0.4.0
##### 2018-Apr-16
* Add community resources:
  * Germany (#69, #72)
  * Rome and Lazio meetups (#68, #67)
  * Austria (#64)
  * Chile (#56, #57, #58, #59)
  * OSM-CA Slack and OSM Ottawa meetup (#63, #51)
  * Madagascar (#53)
  * MapMinnesota (#55)
  * Bangladesh, India, Indonesia, Mongolia, Nepal, Sri Lanka (#48)
  * Brazil and Bahia (#47)
  * Update Australia geojson and add mailing list (#45)
* Add geojson-precision, drop precison of geojsons to 5 digits (#70)
* Validate that event dates are pareseable (#62)
* Fix winding order of all geojsons
* Support types "discord" and "matrix" (e.g. riot chat) (#49)

## 0.3.0
##### 2018-Apr-03
* Add several communities:
  * Czech Republic (#43)
  * Spain (#44)
  * Taiwan (#42, #41)
  * Japan (#40)
  * Vancouver, BC (#39)
  * Argentina (#38)
  * Belarus (#33)
  * India (#28)
  * Many metro regions around US (#27)
  * Australia (#17)
  * Russia (#11)
  * Philippines (#9)
* Add FontAwesome icons for each resource type (see #1, #31)
* Add support for tracking events (#25)
* Resources don't require `featureId` anymore (world resources won't have one)
* Separate "url" (required) and "signupUrl" (optional) (#20)
* Include both "description" (one line) and "extendedDescription" (#20)
* Add upcoming events (#25)

## 0.2.0
##### 2018-Mar-19
* Don't check in built files on master (#26)
* Automatically prettify source JSON files (#22)
* Raise an error if we detect duplicate ids (#21)

## 0.1.0
##### 2018-Mar-14
* Add languageCodes to track languages spoken. (#6)
* Require points of contact for resources (#12)
* Separate data (resources) and polygons (features) (#7)
