# What's New

**osm-community-index** is an open source project. You can submit bug reports, help out,
or learn more by visiting our project page on GitHub:  :octocat: https://github.com/osmlab/osm-community-index

Please star our project on GitHub to show your support! ⭐️

_Breaking changes, which may affect downstream projects, are marked with a_ ⚠️


<!--
# A.B.C
##### YYYY-MMM-DD

* Added:
* Updated:
* Removed:

[#xxx]: https://github.com/osmlab/osm-community-index/issues/xxx
-->

# 6.0.0
##### 2025-Oct-28
* Various fixes, see [#829]
  * Fix broken .cjs and .mjs bundles ([#828])
  * Converts a bunch of the project to TypeScript and generate d.ts files under `./dist/ts`
  * Adds the "bun" export specifier to package.json, which would allow consumers to import TypeScript directly without going through a bundle.
  * Restore linting
  * Drops js-yaml dependency, Bun has this builtin too!
  * Remove Node version from `package.json` `engines` ([c3738945])

[#829]: https://github.com/osmlab/osm-community-index/issues/829
[#828]: https://github.com/osmlab/osm-community-index/issues/828
[c3738945]: https://github.com/osmlab/osm-community-index/commit/c3738945eeda5c43d6130d0139dc21d36352d39f#r168978734


# 5.10.0
##### 2025-Oct-21
* This project uses [`bun`](https://bun.com/) now, for simpler developer tooling ([#827])
* ⚠️  Exported files under `/dist` have changed:
  * _Generated files are no longer checked into git, but they are published to npm and available on JSDelivr CDN._
  * JSON files are now under `/dist/json/*`
  * JavaScript files are now under `/dist/js/*`
* Updated dependencies, bump to location-conflation v1.7.0 / country-coder v5.6.0
* Added:
  * Emilia-Romagna Telegram ([#815])
  * Puglia Telegram ([#822])
* Updated:
  * Swiss mailing list URL ([#820])
* Removed:
  * Vietnam Mastodon ([#817])
  * Asia Facebook Group ([#819])
  * Catalan Twitter and mailing list ([#821])
  * W&M YouthMappers ([#823])
  * UW Badger Maps ([#824])
  * Central Salish Sea Meetup ([#825])

[#815]: https://github.com/osmlab/osm-community-index/issues/815
[#817]: https://github.com/osmlab/osm-community-index/issues/817
[#819]: https://github.com/osmlab/osm-community-index/issues/819
[#820]: https://github.com/osmlab/osm-community-index/issues/820
[#821]: https://github.com/osmlab/osm-community-index/issues/821
[#822]: https://github.com/osmlab/osm-community-index/issues/822
[#823]: https://github.com/osmlab/osm-community-index/issues/823
[#824]: https://github.com/osmlab/osm-community-index/issues/824
[#825]: https://github.com/osmlab/osm-community-index/issues/825
[#827]: https://github.com/osmlab/osm-community-index/issues/827


# 5.9.3
##### 2025-Jul-31
* Updated dependencies, bump to location-conflation v1.5.0 / country-coder v5.4.0
* Updated:
  * URL for Swiss OSM Mastodon ([#809])
  * URL for Belgium Newsletter ([#812])
  * Fixed language code for Estonian resources ([#813])
* Removed:
  * Belgium IRC ([#812])
  * Maptime HRVA ([#802])
  * Deprecated mailing lists: ([#805], [#808])
    * talk-bf, talk-mw, talk-nz, talk-sc, talk-so, talk-za, talk-zm, talk-af, talk-vn, talk-at, talk-hr, talk-ir, talk-iq, talk-sy, talk-ec, talk-latam

[#802]: https://github.com/osmlab/osm-community-index/issues/802
[#805]: https://github.com/osmlab/osm-community-index/issues/805
[#808]: https://github.com/osmlab/osm-community-index/issues/808
[#809]: https://github.com/osmlab/osm-community-index/issues/809
[#812]: https://github.com/osmlab/osm-community-index/issues/812
[#813]: https://github.com/osmlab/osm-community-index/issues/813


# 5.9.2
##### 2025-Apr-24
* Bump required Node to 22
* Added:
  * Minas Gerais, Brazil Discord ([#803])
  * Punjab region resources ([#784])
  * YouthMappers UFRJ and IVIDES Bluesky, LinkedIn ([#781], [#790], [#791], [#792])
* Updated:
  * Rename Twitter to "X" instead of "𝕏" due to accessibility concerns ([#804])
  * Fix Latvia Zulip Chat URL ([#795])
  * Hungary resources and sort orders ([#794])
  * MapRVA links ([#782])
  * IVIDES Youtube channel ID ([#779])
* Removed:
  * United Kingdom Loomio Chat ([#801])
  * Mainz Telegram Chat ([#798])
  * YouthMappers UFRJ and IVIDES Instagram, Facebook ([#785], [#786], [#787], [#788])

[#779]: https://github.com/osmlab/osm-community-index/issues/779
[#781]: https://github.com/osmlab/osm-community-index/issues/781
[#782]: https://github.com/osmlab/osm-community-index/issues/782
[#784]: https://github.com/osmlab/osm-community-index/issues/784
[#785]: https://github.com/osmlab/osm-community-index/issues/785
[#786]: https://github.com/osmlab/osm-community-index/issues/786
[#787]: https://github.com/osmlab/osm-community-index/issues/787
[#788]: https://github.com/osmlab/osm-community-index/issues/788
[#790]: https://github.com/osmlab/osm-community-index/issues/790
[#791]: https://github.com/osmlab/osm-community-index/issues/791
[#792]: https://github.com/osmlab/osm-community-index/issues/792
[#794]: https://github.com/osmlab/osm-community-index/issues/794
[#795]: https://github.com/osmlab/osm-community-index/issues/795
[#798]: https://github.com/osmlab/osm-community-index/issues/798
[#801]: https://github.com/osmlab/osm-community-index/issues/801
[#803]: https://github.com/osmlab/osm-community-index/issues/803
[#804]: https://github.com/osmlab/osm-community-index/issues/804


# 5.9.1
##### 2025-Jan-15
* Added:
  * YouthMappers UFRJ and IVIDES ([#765])
  * DE Mainz Signal Group ([#767])
  * OSM Iraq Twitter ([#768])
* Updated:
  * Swedish community resources ([#775])
* Removed:
  * OSM Belgium Twitter ([#776])

[#765]: https://github.com/osmlab/osm-community-index/issues/765
[#767]: https://github.com/osmlab/osm-community-index/issues/767
[#768]: https://github.com/osmlab/osm-community-index/issues/768
[#775]: https://github.com/osmlab/osm-community-index/issues/775
[#776]: https://github.com/osmlab/osm-community-index/issues/776


# 5.9.0
##### 2024-Dec-16
* Updated dependencies, bump to location-conflation v1.4.1 / country-coder v5.3.1
* Support new resource type: `bluesky`
* Added:
  * Many community forum links ([#741], [#742], [#743], [#744], [#745], [#746], [#747], [#748], [#752]):
    * Africa, Austria, Bangladesh, Canada, Croatia, Estonia, Finland, Hungary, Indonesia, Malaysia, Mexico, Nepal, Russia, Sweden, Ukraine, Venezuela
  * Social networks for OSM Colombia ([#749])
  * Social networks for TadeoMappers ([#754])
  * Nelson, New Zealand mapping group ([#755])
  * Georgia Matrix ([#760])
  * Croatia resources and remove IRC ([#762])
  * Bulgaria Matrix ([#766])
* Updated:
  * Switch OSM Berlin from Telegram to Mastodon ([#740])
  * Many sort orders updated ([#750], [#751], [#753]):
    * India, Ireland, Italy, Serbia, Thailand
* Removed:
  * Ireland Meetup ([#750])
  * Indonesia mailing list
  * Many groups with dead links ([#757])
  * MapABQ ([#759])

[#740]: https://github.com/osmlab/osm-community-index/issues/740
[#741]: https://github.com/osmlab/osm-community-index/issues/741
[#742]: https://github.com/osmlab/osm-community-index/issues/742
[#743]: https://github.com/osmlab/osm-community-index/issues/743
[#744]: https://github.com/osmlab/osm-community-index/issues/744
[#745]: https://github.com/osmlab/osm-community-index/issues/745
[#746]: https://github.com/osmlab/osm-community-index/issues/746
[#747]: https://github.com/osmlab/osm-community-index/issues/747
[#748]: https://github.com/osmlab/osm-community-index/issues/748
[#749]: https://github.com/osmlab/osm-community-index/issues/749
[#750]: https://github.com/osmlab/osm-community-index/issues/750
[#751]: https://github.com/osmlab/osm-community-index/issues/751
[#752]: https://github.com/osmlab/osm-community-index/issues/752
[#753]: https://github.com/osmlab/osm-community-index/issues/753
[#754]: https://github.com/osmlab/osm-community-index/issues/754
[#755]: https://github.com/osmlab/osm-community-index/issues/755
[#757]: https://github.com/osmlab/osm-community-index/issues/757
[#759]: https://github.com/osmlab/osm-community-index/issues/759
[#760]: https://github.com/osmlab/osm-community-index/issues/760
[#762]: https://github.com/osmlab/osm-community-index/issues/762
[#766]: https://github.com/osmlab/osm-community-index/issues/766


# 5.8.1
##### 2024-Sep-12
* Project has been tested and works on Node 22
* Added:
  * Chile Matrix ([#717])
  * West Bengal Telegram and Matrix ([#722])
  * Vietnam Mastodon ([#727])
  * Vietnam Telegram and Wiki page ([#728])
  * Swiss Mastodon and Discourse ([#732], [#733], [#734])
  * MapLYH Signal group for Lynchburg, Virginia, USA ([#735])
  * Japan Discord ([#738])
* Updated:
  * Language codes and description for OSM World Discord ([#726])
  * Switch OSM San José from Meetup to Mastodon ([#730])
  * Cypriot locationSet to include the entire island ([#731])
  * Use better icon for Signal Messenger resource type ([#737])
* Removed:
  * OSM Fiji website ([#729])
  * `talk-ru` mailing list and OSM Russia Twitter account ([#736])
  * Japan Slack ([#738])

[#717]: https://github.com/osmlab/osm-community-index/issues/717
[#722]: https://github.com/osmlab/osm-community-index/issues/722
[#726]: https://github.com/osmlab/osm-community-index/issues/726
[#727]: https://github.com/osmlab/osm-community-index/issues/727
[#728]: https://github.com/osmlab/osm-community-index/issues/728
[#729]: https://github.com/osmlab/osm-community-index/issues/729
[#730]: https://github.com/osmlab/osm-community-index/issues/730
[#731]: https://github.com/osmlab/osm-community-index/issues/731
[#732]: https://github.com/osmlab/osm-community-index/issues/732
[#733]: https://github.com/osmlab/osm-community-index/issues/733
[#734]: https://github.com/osmlab/osm-community-index/issues/734
[#735]: https://github.com/osmlab/osm-community-index/issues/735
[#736]: https://github.com/osmlab/osm-community-index/issues/736
[#737]: https://github.com/osmlab/osm-community-index/issues/737
[#738]: https://github.com/osmlab/osm-community-index/issues/738


# 5.8.0
##### 2024-Jul-17
* Updated dependencies, bump to location-conflation v1.4.0 / country-coder v5.3.0
* Updated to FontAwesome v6.6.x, some icons updated
* Added:
  * Cypriot Matrix ([#718], [#720])
  * Georgia Telegram ([#723])
  * Asia Facebook Group ([#725])
* Updated:
  * Utah Meetup is now a website ([#719])

[#718]: https://github.com/osmlab/osm-community-index/issues/718
[#719]: https://github.com/osmlab/osm-community-index/issues/719
[#720]: https://github.com/osmlab/osm-community-index/issues/720
[#723]: https://github.com/osmlab/osm-community-index/issues/723
[#725]: https://github.com/osmlab/osm-community-index/issues/725


# 5.7.1
##### 2024-May-28
* Added:
  * Italy, France, Serbia Linkedin groups ([#563])
  * Greece Discourse ([#716])
* Updated:
  * Niger Facebook link ([#691])

[#563]: https://github.com/osmlab/osm-community-index/issues/563
[#691]: https://github.com/osmlab/osm-community-index/issues/691
[#716]: https://github.com/osmlab/osm-community-index/issues/716


# 5.7.0
##### 2024-May-24
* Support new resource types: `fediverse`, `instagram`, `tiktok` ([#670], [#710])
* Added:
  * United Kingdom Discourse ([#713])
  * YouthMappers Oregon State University ([#714])
* Updated:
  * Fixed mailing list for OSM Mainz ([#712])
* Removed:
  * Inactive OSMChina website ([#715])

[#670]: https://github.com/osmlab/osm-community-index/issues/670
[#710]: https://github.com/osmlab/osm-community-index/issues/710
[#712]: https://github.com/osmlab/osm-community-index/issues/712
[#713]: https://github.com/osmlab/osm-community-index/issues/713
[#714]: https://github.com/osmlab/osm-community-index/issues/714
[#715]: https://github.com/osmlab/osm-community-index/issues/715


# 5.6.3
##### 2024-May-01
* Added:
  * Resources for Colombia and Bogota ([#709])
  * Resources for Mainz, Germany ([#707])
  * Netherlands Discourse ([#705])
* Removed:
  * Inactive Portland resources ([#711])
  * Michigan Facebook ([#706])
  * Inactive Norway mailing list, update other resources ([#704])
  * Inactive Boston Meetup group ([#703])
  * Inactive UVM Humanitarian Mapping club ([#702])

[#702]: https://github.com/osmlab/osm-community-index/issues/702
[#703]: https://github.com/osmlab/osm-community-index/issues/703
[#704]: https://github.com/osmlab/osm-community-index/issues/704
[#705]: https://github.com/osmlab/osm-community-index/issues/705
[#706]: https://github.com/osmlab/osm-community-index/issues/706
[#707]: https://github.com/osmlab/osm-community-index/issues/707
[#709]: https://github.com/osmlab/osm-community-index/issues/709
[#711]: https://github.com/osmlab/osm-community-index/issues/711


# 5.6.2
##### 2024-Feb-26
* Add Armenia Wiki, Singapore Wiki and Telegram ([#693])
* Remove nonexistant `talk-al` mailing list ([#695])
* Add Iraq Telegram ([#696])
* Add West Bengal, Dehli, Indian XMPP resources ([#697])
* Update Portugal and Brazil sort orders, added Brazil wiki ([#698])
* Remove `help.osm.org`, as it will be readonly from March 1 ([#700])

[#693]: https://github.com/osmlab/osm-community-index/issues/693
[#695]: https://github.com/osmlab/osm-community-index/issues/695
[#696]: https://github.com/osmlab/osm-community-index/issues/696
[#697]: https://github.com/osmlab/osm-community-index/issues/697
[#698]: https://github.com/osmlab/osm-community-index/issues/698
[#700]: https://github.com/osmlab/osm-community-index/issues/700


# 5.6.1
##### 2023-Dec-21
* Bump required Node to 18, swap `tap` for `node:test`
* Added:
  * Catalan community Twitch channel ([#680])
  * Bengaluru commmunity resources ([#682])
  * London Mastodon ([#683])
  * India Mastodon ([#685])
  * Canada Matrix ([#686])
  * India forum ([#687])
  * Montenegro Telegram ([#690])
  * Portugal community Discord ([#692])
* Updated:
  * Specify language for MapRVA ([#679])
  * Fix city locations in Poland (Warszawa & Góra Kalwaria were swapped) ([#684])
* Removed:
  * Discontinued @osm_at Twitter account ([#689])

[#679]: https://github.com/osmlab/osm-community-index/issues/679
[#680]: https://github.com/osmlab/osm-community-index/issues/680
[#682]: https://github.com/osmlab/osm-community-index/issues/682
[#683]: https://github.com/osmlab/osm-community-index/issues/683
[#684]: https://github.com/osmlab/osm-community-index/issues/684
[#685]: https://github.com/osmlab/osm-community-index/issues/685
[#686]: https://github.com/osmlab/osm-community-index/issues/686
[#687]: https://github.com/osmlab/osm-community-index/issues/687
[#689]: https://github.com/osmlab/osm-community-index/issues/689
[#690]: https://github.com/osmlab/osm-community-index/issues/690
[#692]: https://github.com/osmlab/osm-community-index/issues/692


# 5.6.0
##### 2023-Aug-27
* Rebrand Twitter to 𝕏, support both `twitter` and `x` interchangeably ([#678])
* Support new resource type `threads` ([#677])
* Updated:
  * OSM mastodon should be higher ([#675])
  * IRC should list port 6697 ([#676])
  * Use square icons for consistency, where available

[#675]: https://github.com/osmlab/osm-community-index/issues/675
[#676]: https://github.com/osmlab/osm-community-index/issues/676
[#677]: https://github.com/osmlab/osm-community-index/issues/677
[#678]: https://github.com/osmlab/osm-community-index/issues/678


# 5.5.5
##### 2023-Aug-17
* Added:
  * Add MapRVA Mastadon ([#671], [#673])
* Updated:
  * Update osm.ch to type `url` ([#669])
  * Update Swiss Mailing List URL ([#668])
  * Use English language for source strings ([#576], [#577])
* Deleted:
  * Remove defunct OSM Canada Slack ([#661])
  * Remove defunct YouthMappers Montgomery College ([#674])

[#576]: https://github.com/osmlab/osm-community-index/issues/576
[#577]: https://github.com/osmlab/osm-community-index/issues/577
[#661]: https://github.com/osmlab/osm-community-index/issues/661
[#668]: https://github.com/osmlab/osm-community-index/issues/668
[#669]: https://github.com/osmlab/osm-community-index/issues/669
[#671]: https://github.com/osmlab/osm-community-index/issues/671
[#673]: https://github.com/osmlab/osm-community-index/issues/673
[#674]: https://github.com/osmlab/osm-community-index/issues/674


# 5.5.4
##### 2023-Jul-12
* Bump dependencies, including location-conflation v1.2.1 / country-coder v5.2.1
* Added:
  * Swiss OSM local chapter ([#664])
* Updated:
  * Rename Code for San José to Open Source San José ([#666], [#667])
* Deleted:
  * Sacred Heart Junior College YouthMappers ([#665])

[#664]: https://github.com/osmlab/osm-community-index/issues/664
[#665]: https://github.com/osmlab/osm-community-index/issues/665
[#666]: https://github.com/osmlab/osm-community-index/issues/666
[#667]: https://github.com/osmlab/osm-community-index/issues/667


# 5.5.3
##### 2023-Jun-20
* Added:
  * Ohio community wiki ([#660])
  * Brazilian Discourse and Ceará state telegram ([#659])
* Deleted:
  * Removed `/r/openstreetmap` subreddit ([#662])

[#659]: https://github.com/osmlab/osm-community-index/issues/659
[#660]: https://github.com/osmlab/osm-community-index/issues/660
[#662]: https://github.com/osmlab/osm-community-index/issues/662


# 5.5.2
##### 2023-Apr-27
* Updated:
  * Fix community name for kosovo-flossk: Kosovo, not Slovakia ([#657])
  * Remove some more instances where resource had "Discourse" in its name ([#656])

[#656]: https://github.com/osmlab/osm-community-index/issues/656
[#657]: https://github.com/osmlab/osm-community-index/issues/657


# 5.5.1
##### 2023-Apr-20
* Added:
  * Belize Telegram ([#639])
  * Portugal Discourse ([#655])
  * Aachen region matrix and wiki ([#651])
  * Restore OSM Turkey Telegram ([#650])
  * Catalan Countries Mastodon ([#647])
  * Malaysia Telegram ([#645])
* Updated:
  * Rename "Discourse" -> "Commmunity Forum" ([#656])
  * Fix boundaries for Torino Telegram ([#642])
  * Update Pakistan Facebook ([#652])
  * Update Code for San José Slack and Discord ([#654])
  * Sort Poland Discourse as top result ([#643])
  * Use https for resources and documentation. ([#638])
* Deleted:
  * OSM MV Twitter ([#653])
  * Belgium mailinglist ([#646])

[#638]: https://github.com/osmlab/osm-community-index/issues/638
[#639]: https://github.com/osmlab/osm-community-index/issues/639
[#642]: https://github.com/osmlab/osm-community-index/issues/642
[#643]: https://github.com/osmlab/osm-community-index/issues/643
[#645]: https://github.com/osmlab/osm-community-index/issues/645
[#646]: https://github.com/osmlab/osm-community-index/issues/646
[#647]: https://github.com/osmlab/osm-community-index/issues/647
[#650]: https://github.com/osmlab/osm-community-index/issues/650
[#651]: https://github.com/osmlab/osm-community-index/issues/651
[#652]: https://github.com/osmlab/osm-community-index/issues/652
[#653]: https://github.com/osmlab/osm-community-index/issues/653
[#654]: https://github.com/osmlab/osm-community-index/issues/654
[#655]: https://github.com/osmlab/osm-community-index/issues/655
[#656]: https://github.com/osmlab/osm-community-index/issues/656


# 5.5.0
##### 2023-Jan-13
* Support new resource type `zulip` ([#607])
* Added:
  * Armenia Telegram ([#632])
  * Multiple resources for Korea ([#634])
  * Norway Discourse ([#630])
  * Turin Telegram ([#626])
  * Multiple resources for Latvia ([#607])
  * OpenStreetMap Mastodon ([#550], [#166])
* Updated:
  * Fix link to new website for OSM Italia ([#636])
  * Cleanup redundant text ([#635])
  * Fix invite link for OSM Japan Slack ([#631])
* Deleted:
  * MapColabora meetup shutting down ([#637])

[#166]: https://github.com/osmlab/osm-community-index/issues/166
[#550]: https://github.com/osmlab/osm-community-index/issues/550
[#607]: https://github.com/osmlab/osm-community-index/issues/607
[#626]: https://github.com/osmlab/osm-community-index/issues/626
[#630]: https://github.com/osmlab/osm-community-index/issues/630
[#631]: https://github.com/osmlab/osm-community-index/issues/631
[#632]: https://github.com/osmlab/osm-community-index/issues/632
[#634]: https://github.com/osmlab/osm-community-index/issues/634
[#635]: https://github.com/osmlab/osm-community-index/issues/635
[#636]: https://github.com/osmlab/osm-community-index/issues/636
[#637]: https://github.com/osmlab/osm-community-index/issues/637


# 5.4.0
##### 2022-Dec-12
* Support new resource types `mastodon` ([#605]) and `signal` ([#622])
* If `community` name string is present, also include generated `communityID` translation key ([#616])
* Update to location-conflation v1.1 / country-coder v5.1 (and update other dependencies)
* Added:
  * Bulgaria Discourse ([#598])
  * Oceania Discourse ([#599])
  * Geogeeks Perth ([#600])
  * Multiple Slovenian resources ([#601], [#602], [#603])
  * Belgium Mastodon ([#605])
  * United States Discourse
  * Austria Mastodon ([#606])
  * Denmark Discourse ([#615])
  * Poland Discourse ([#619])
  * China Matrix ([#608])
  * South Africa Discourse ([#629])
* Updated:
  * Update Czech resource links and sorting ([#604])
  * Fix Ireland Telegram invite link ([#609])
  * Set OSM Austria as an official local chapter ([#625])
  * Fix link to Geospatial Engineering Students Association ([#624], [#628])
* Removed:
  * Türkiye telegram group, requires payment ([#610])
  * Togo telegram group, now readonly ([#611])
  * Benin telegram group no longer active ([#612])

[#598]: https://github.com/osmlab/osm-community-index/issues/598
[#599]: https://github.com/osmlab/osm-community-index/issues/599
[#600]: https://github.com/osmlab/osm-community-index/issues/600
[#601]: https://github.com/osmlab/osm-community-index/issues/601
[#602]: https://github.com/osmlab/osm-community-index/issues/602
[#603]: https://github.com/osmlab/osm-community-index/issues/603
[#604]: https://github.com/osmlab/osm-community-index/issues/604
[#605]: https://github.com/osmlab/osm-community-index/issues/605
[#606]: https://github.com/osmlab/osm-community-index/issues/606
[#608]: https://github.com/osmlab/osm-community-index/issues/608
[#609]: https://github.com/osmlab/osm-community-index/issues/609
[#610]: https://github.com/osmlab/osm-community-index/issues/610
[#611]: https://github.com/osmlab/osm-community-index/issues/611
[#612]: https://github.com/osmlab/osm-community-index/issues/612
[#615]: https://github.com/osmlab/osm-community-index/issues/615
[#616]: https://github.com/osmlab/osm-community-index/issues/616
[#619]: https://github.com/osmlab/osm-community-index/issues/619
[#622]: https://github.com/osmlab/osm-community-index/issues/622
[#624]: https://github.com/osmlab/osm-community-index/issues/624
[#625]: https://github.com/osmlab/osm-community-index/issues/625
[#628]: https://github.com/osmlab/osm-community-index/issues/628
[#629]: https://github.com/osmlab/osm-community-index/issues/629


# 5.3.1
##### 2022-Nov-01
* Added:
  * Serbia Discourse ([#587])
  * Portual WikiProject ([#589])
  * Catalan Countries Discourse ([#591])
  * North Korea Wikiproject ([#554])
  * Mapping USA virtual conference
* Updated:
  * Fix escaping of hashes in Matrix URLs ([#592], [#593])
  * Fix sorting of OSM Austria resources ([#590])
* Removed:
  * Deprecated links to forum.openstreetmap.org ([#594])

[#554]: https://github.com/osmlab/osm-community-index/issues/554
[#587]: https://github.com/osmlab/osm-community-index/issues/587
[#589]: https://github.com/osmlab/osm-community-index/issues/589
[#590]: https://github.com/osmlab/osm-community-index/issues/590
[#591]: https://github.com/osmlab/osm-community-index/issues/591
[#592]: https://github.com/osmlab/osm-community-index/issues/592
[#593]: https://github.com/osmlab/osm-community-index/issues/593
[#594]: https://github.com/osmlab/osm-community-index/issues/594


# 5.3.0
##### 2022-Oct-04
* Support new resource type `newsletter`
* Updated to FontAwesome 6.2.x, some icons updated ([#567])
* Added:
  * Swap Belgium Forum -> Discourse ([#585])
  * Spain Discourse ([#584])
  * Italy Discourse ([#582])
  * Swap German Forum -> Discourse ([#581])
  * Thailand Discourse ([#571])
  * Ireland Discourse ([#569])
  * Israel Discourse ([#568])
  * Colombia Discourse ([#562])
  * LATAM Discourse ([#561])
  * OpenStreetMap Deep South (US) ([#559])
  * Belgium quarterly newsletter ([#549])
* Updated:
  * Fix Taiwan Discourse type ([#570])
  * Many updates to spelling and punctuation for YouthMappers resources
* Removed:
  * Belgium Facebook page ([#586])
  * Japan Teletram ([#560])
  * Azerbaijan Facebook page ([#547])
  * Albania Teletram ([#546])

[#546]: https://github.com/osmlab/osm-community-index/issues/546
[#547]: https://github.com/osmlab/osm-community-index/issues/547
[#549]: https://github.com/osmlab/osm-community-index/issues/549
[#559]: https://github.com/osmlab/osm-community-index/issues/559
[#560]: https://github.com/osmlab/osm-community-index/issues/560
[#561]: https://github.com/osmlab/osm-community-index/issues/561
[#562]: https://github.com/osmlab/osm-community-index/issues/562
[#567]: https://github.com/osmlab/osm-community-index/issues/567
[#568]: https://github.com/osmlab/osm-community-index/issues/568
[#569]: https://github.com/osmlab/osm-community-index/issues/569
[#570]: https://github.com/osmlab/osm-community-index/issues/570
[#571]: https://github.com/osmlab/osm-community-index/issues/571
[#581]: https://github.com/osmlab/osm-community-index/issues/581
[#582]: https://github.com/osmlab/osm-community-index/issues/582
[#584]: https://github.com/osmlab/osm-community-index/issues/584
[#585]: https://github.com/osmlab/osm-community-index/issues/585
[#586]: https://github.com/osmlab/osm-community-index/issues/586


# 5.2.0
##### 2022-Jun-18
* Many various updates to use more consistent names and ids ([#524])
* Added:
  * OpenStreetmap Discourse ([#530])
  * Maptime Catalan Communities ([#525])
* Updated:
  * Taiwan Community resources ([#544])
  * Argentina Community resources ([#526])
  * Maptime Bogota ([#515])
  * BE Matrix ([#514])
* Removed unused resources:
  * Albania Telegram ([#546])
  * Azerbaijan Facebook ([#547])
  * Côte d'Ivoire Telegram ([#538],[#539])
  * wiki.freemap.sk ([#537])
  * YouthMappers NYU ([#529])

[#514]: https://github.com/osmlab/osm-community-index/issues/514
[#515]: https://github.com/osmlab/osm-community-index/issues/515
[#524]: https://github.com/osmlab/osm-community-index/issues/524
[#525]: https://github.com/osmlab/osm-community-index/issues/525
[#526]: https://github.com/osmlab/osm-community-index/issues/526
[#529]: https://github.com/osmlab/osm-community-index/issues/529
[#530]: https://github.com/osmlab/osm-community-index/issues/530
[#537]: https://github.com/osmlab/osm-community-index/issues/537
[#538]: https://github.com/osmlab/osm-community-index/issues/538
[#539]: https://github.com/osmlab/osm-community-index/issues/539
[#544]: https://github.com/osmlab/osm-community-index/issues/544
[#546]: https://github.com/osmlab/osm-community-index/issues/546
[#547]: https://github.com/osmlab/osm-community-index/issues/547


# 5.1.6
##### 2022-Feb-16

* Added:
  * MapABQ Albuquerque/New Mexico Meetup ([#505], [#506])
  * Resources and features for Spanish regions ([#503])
* Updated:
  * Chiang Mai Meetup URL ([#507])
  * Fix OSM Nigeria Twitter account ([#504])

[#503]: https://github.com/osmlab/osm-community-index/issues/503
[#504]: https://github.com/osmlab/osm-community-index/issues/504
[#505]: https://github.com/osmlab/osm-community-index/issues/505
[#506]: https://github.com/osmlab/osm-community-index/issues/506
[#507]: https://github.com/osmlab/osm-community-index/issues/507


# 5.1.5
##### 2022-Jan-18

* Added:
  * Talk-pacific mailing list ([#498])
  * Vietnam Facebook group, mailing list
  * Czech IRC, Jabber, Matrix and Telegram groups ([#500])
  * Latvian and Estonian resources ([#499], [#501])
* Updated:
  * OSM Hungary resources, forum, and tasking manager ([#502])
  * Updated Code for San José Slack signup URL
  * Fix type and other data for OpenStreetMap Piemonte, Italy ([#497])
  * Updated Ghana channels contacts ([#496])

[#502]: https://github.com/osmlab/osm-community-index/issues/502
[#501]: https://github.com/osmlab/osm-community-index/issues/501
[#500]: https://github.com/osmlab/osm-community-index/issues/500
[#499]: https://github.com/osmlab/osm-community-index/issues/499
[#498]: https://github.com/osmlab/osm-community-index/issues/498
[#497]: https://github.com/osmlab/osm-community-index/issues/497
[#496]: https://github.com/osmlab/osm-community-index/issues/496


# 5.1.4
##### 2021-Nov-30

* Added:
  * Added SOTM-US 2022 in Tucson, Arizona
  * Added AT IRC channel ([#489])
  * Added OSM Korea resources ([#484])
* Updated:
  * Updated icons from FontAwesome (this updated the Discord icon)
* Removed:
  * Remove ym-Institute-of-Finance-Management.json ([#493])
  * Remove Berlin Meetup ([#492])

[#493]: https://github.com/osmlab/osm-community-index/issues/493
[#492]: https://github.com/osmlab/osm-community-index/issues/492
[#489]: https://github.com/osmlab/osm-community-index/issues/489
[#484]: https://github.com/osmlab/osm-community-index/issues/484


# 5.1.3
##### 2021-Aug-17
* Added OSM Mexico Matrix Chat ([#480])
* Added/Updated official local chapters ([#482]):
  * OSM Japan
  * OSM Poland
  * OSGeo Oceania
  * OSM CZ (Czechia)
  * OSM Freemap Slovakia
  * FLOSSK (Kosovo)
  * OSM RDC (Democratic Republic of Congo)
  * GeoLibres (Argentina)

[#480]: https://github.com/osmlab/osm-community-index/issues/480
[#482]: https://github.com/osmlab/osm-community-index/issues/482


# 5.1.2
##### 2021-Jul-29
* Added resources:
  * OSM French Polynesia ([#479])
* Updated:
  * Fix #osm-at matrix account name ([#348])
  * Update OSM Japan Slack invitation url ([#478])

[#348]: https://github.com/osmlab/osm-community-index/issues/348
[#478]: https://github.com/osmlab/osm-community-index/issues/478
[#479]: https://github.com/osmlab/osm-community-index/issues/479


# 5.1.1
##### 2021-Jul-13
* Update `xmpp.svg` logo ([#476])
* Switch "gb" to use "Q3336843" (UK countries excl. BOTS) ([country-coder#35])

[#476]: https://github.com/osmlab/osm-community-index/issues/476
[country-coder#35]: https://github.com/rapideditor/country-coder/issues/35


# 5.1.0
##### 2021-Jun-24
* Support new resource type `linkedin` ([#474])
* Restore the `features/` and `resources/` folders in what we publish ([#471])

[#474]: https://github.com/osmlab/osm-community-index/issues/474
[#471]: https://github.com/osmlab/osm-community-index/issues/471


# 5.0.1
##### 2021-Jun-24
* Remove "browser" from the export map, upgrade dependencies


# 5.0.0
##### 2021-Jun-18
* Bump to location-conflation v1.0.1 / country-coder v5.0.1
* ⚠️  Replace rollup with [esbuild](https://esbuild.github.io/) for super fast build speed. Package exports are now:
  * `"module": "./index.mjs"` - ESM, modern JavaScript, works with `import`
  * `"main": "./dist/oci.cjs"` - CJS bundle, modern JavaScript, works with `require()`
  * `"browser": "./dist/oci.iife.js"` - IIFE bundle, modern JavaScript, works in browser `<script>` tag
  * No longer distributing ES5 builds
* ⚠️  osm-community-index is marked as `"type": "module"` now
* ⚠️  Dropped support for old browsers like Internet Explorer on https://openstreetmap.community
* Updated:
  * Update OSM World Discord to the new vanity URL ([#464])

[#464]: https://github.com/osmlab/osm-community-index/issues/464


# 4.0.2
##### 2021-Jun-06
* Bump to location-conflation v0.9.0 / country-coder v4.1.0


# 4.0.1
##### 2021-May-21
Added:
  * OSM Kerala GitHub ([#463])
  * OSM Netherlands Mailing List and Wonder.me ([#462])
* Updated:
  * Adjust sort of resources around London ([#460])

[#463]: https://github.com/osmlab/osm-community-index/issues/463
[#462]: https://github.com/osmlab/osm-community-index/issues/462
[#460]: https://github.com/osmlab/osm-community-index/issues/460


# 4.0.0
##### 2021-Apr-30
* Added/updated hundreds of missing resources (mainly [#423], also [#445], [#454], [#456])
* ⚠️  Changed file format to support default strings and token replacements (see [#30])
  * Added `defaults.json` - now contains default translatable strings (e.g. `'description': 'The official mailing list for {community}'`)<br/>This makes much less work for our volunteer translators.
  * Added `account` property as a companion to `type` (e.g. `'type': 'mailinglist', 'account': 'talk-ru'`)
  * `strings` object now holds all the source strings, including `community`, `name`, `url`, `description`, `extendedDescription`
  * `resolveStrings` function can be used resolve all the strings and also generate linkified strings<br/>This function is exported in ES6/CJS formats for downstream projects to use
  * `completeFeatureCollection.json` now contains `resolved` Object with all the resolved strings
* Many updates to project documentation
* Added `npm run local` command to test the index locally ([#433])
* <https://openstreetmap.community> now has option to generate a permalink ([#393], [#440])

[#456]: https://github.com/osmlab/osm-community-index/issues/456
[#454]: https://github.com/osmlab/osm-community-index/issues/454
[#445]: https://github.com/osmlab/osm-community-index/issues/445
[#440]: https://github.com/osmlab/osm-community-index/issues/440
[#433]: https://github.com/osmlab/osm-community-index/issues/433
[#423]: https://github.com/osmlab/osm-community-index/issues/423
[#393]: https://github.com/osmlab/osm-community-index/issues/393
[#30]: https://github.com/osmlab/osm-community-index/issues/30


# 3.1.2
##### 2021-Mar-30
* Added:
  * OSM Azerbaijan Facebook ([#429])
  * OSM Bangledesh ([#429])
  * OSM Belarus ([#429])
  * OSM Afghanistan Talk list ([#427])
  * OSM Algeria forum ([#427])
  * OSM Albania Facebook ([#427])
  * OSM Cameroon ([#425], [#426])
  * OSM Berlin Matrix ([#419])
  * OSM Asti (Italy) ([#416])
  * OSM Poland Discord ([#412], [#415])
* Updated:
  * Update descriptions and ordering for OSM Luxembourg ([#428])
  * Correct OSM World Discord name ([#420])
  * Adjust sort order for global OSM resources ([#418])
  * Adjust sort order for OSM Poland GitHub ([#413])
  * Correct region for UK local chapter ([#411])
* Removed Inactive:
  * YouthMappers chapter ym-Tribhuvan-University ([#422])
  * YouthMappers chapter ym-Kathmandu-University ([#421])

[#411]: https://github.com/osmlab/osm-community-index/issues/411
[#412]: https://github.com/osmlab/osm-community-index/issues/412
[#413]: https://github.com/osmlab/osm-community-index/issues/413
[#415]: https://github.com/osmlab/osm-community-index/issues/415
[#416]: https://github.com/osmlab/osm-community-index/issues/416
[#418]: https://github.com/osmlab/osm-community-index/issues/418
[#419]: https://github.com/osmlab/osm-community-index/issues/419
[#420]: https://github.com/osmlab/osm-community-index/issues/420
[#421]: https://github.com/osmlab/osm-community-index/issues/421
[#422]: https://github.com/osmlab/osm-community-index/issues/422
[#425]: https://github.com/osmlab/osm-community-index/issues/425
[#426]: https://github.com/osmlab/osm-community-index/issues/426
[#427]: https://github.com/osmlab/osm-community-index/issues/427
[#428]: https://github.com/osmlab/osm-community-index/issues/428
[#429]: https://github.com/osmlab/osm-community-index/issues/429


# 3.1.1
##### 2021-Jan-27
* Added:
  * OSM Kerala Matrix ([#410])
  * OSM India Matrix ([#409])
  * OSM France Matrix ([#408])
* Updated:
  * OSM World Discord language codes ([#406])

[#406]: https://github.com/osmlab/osm-community-index/issues/406
[#408]: https://github.com/osmlab/osm-community-index/issues/408
[#409]: https://github.com/osmlab/osm-community-index/issues/409
[#410]: https://github.com/osmlab/osm-community-index/issues/410


# 3.1.0
##### 2021-Jan-03
* Support new resource type `gitlab` ([#404])
* Added:
  * OSM Serbia resources ([#404])
  * US Michagin Wiki ([#403])
  * OSM Finland Telegram ([#402])
  * OSM Iran Discord ([#400])
  * OSM Norway Matrix ([#399])
* Updated:
  * OSM World Discord URL ([#401])

[#398]: https://github.com/osmlab/osm-community-index/issues/398
[#399]: https://github.com/osmlab/osm-community-index/issues/399
[#400]: https://github.com/osmlab/osm-community-index/issues/400
[#401]: https://github.com/osmlab/osm-community-index/issues/401
[#402]: https://github.com/osmlab/osm-community-index/issues/402
[#403]: https://github.com/osmlab/osm-community-index/issues/403
[#404]: https://github.com/osmlab/osm-community-index/issues/404


# 3.0.1
##### 2020-Dec-16
* Updated:
  * Retain all of the country-coder properties in completeFeatureCollection.json ([#398])

[#398]: https://github.com/osmlab/osm-community-index/issues/398


# 3.0.0
##### 2020-Dec-15
* Added:
  * OSM Turkey Facebook group and mailing list ([#395], [#396])
  * OSM Poland Telegram group ([#394])
  * OSM Hong Kong Discord ([#391])
  * OSM Finland Facebook group ([#388])
  * Catalan community resources ([#387])
  * Fix OSM Iraq mailing list so it is now included ([#370])
  * OSM Austria Matrix chat ([#348])
* Updated:
  * Update YouthMappers CostaRica source strings to English ([#386])
  * Fix misspelling "Xeoinquedos" ([#344], [#379])
* Dependencies:
  * Upgrade to location-conflation v0.6 / country-coder v4.0
* Breaking Changes:
  * ⚠️  Removed unneeded `index.mjs` and `index.js` JavaScript bundles
  * ⚠️  Renamed files for consistency and clarity:
    * `dist/features.json` -> `dist/featureCollection.json`
    * `dist/combined.geojson` -> `dist/completeFeatureCollection.json`

[#344]: https://github.com/osmlab/osm-community-index/issues/344
[#348]: https://github.com/osmlab/osm-community-index/issues/348
[#370]: https://github.com/osmlab/osm-community-index/issues/370
[#379]: https://github.com/osmlab/osm-community-index/issues/379
[#386]: https://github.com/osmlab/osm-community-index/issues/386
[#387]: https://github.com/osmlab/osm-community-index/issues/387
[#388]: https://github.com/osmlab/osm-community-index/issues/388
[#391]: https://github.com/osmlab/osm-community-index/issues/391
[#394]: https://github.com/osmlab/osm-community-index/issues/394
[#395]: https://github.com/osmlab/osm-community-index/issues/395
[#396]: https://github.com/osmlab/osm-community-index/issues/396


# 2.1.2
##### 2020-Oct-21
* Added:
  * OSM Malta IRC room ([#374])
  * OSM Italy, Lombardy region ([#372], [#373], [#378])
  * OSM Iraq mailing list ([#370])
  * OSM France, Grenoble region ([#369])
  * OSM Luxembourg resources ([#367])
  * XMPP chat for France ([#362])
  * Germany, state Baden-Wuerttemberg resources ([#356])
  * Poland Github ([#350])
  * XMPP chat for Berlin / Germany ([#349])
* Updated:
  * Use matrix.to links for Matrix chat ([#365], [#366], [#375], [#376], [#377])
  * Updated descriptions and links for Philippine channels ([#371])
  * Adjust ranking of Irish community resources ([#368])
  * OSM-US is an official local chapter now
  * Correct typo 'OSM Croaria' -> 'OSM Croatia'
  * MappingDC is one word
  * Add missing HTTP(S) to URL ([#351])
* Removed:
  * osmcz-telegram ([#361])

[#349]: https://github.com/osmlab/osm-community-index/issues/349
[#350]: https://github.com/osmlab/osm-community-index/issues/350
[#351]: https://github.com/osmlab/osm-community-index/issues/351
[#356]: https://github.com/osmlab/osm-community-index/issues/356
[#361]: https://github.com/osmlab/osm-community-index/issues/361
[#362]: https://github.com/osmlab/osm-community-index/issues/362
[#365]: https://github.com/osmlab/osm-community-index/issues/365
[#366]: https://github.com/osmlab/osm-community-index/issues/366
[#367]: https://github.com/osmlab/osm-community-index/issues/367
[#368]: https://github.com/osmlab/osm-community-index/issues/368
[#369]: https://github.com/osmlab/osm-community-index/issues/369
[#370]: https://github.com/osmlab/osm-community-index/issues/370
[#371]: https://github.com/osmlab/osm-community-index/issues/371
[#372]: https://github.com/osmlab/osm-community-index/issues/372
[#373]: https://github.com/osmlab/osm-community-index/issues/373
[#374]: https://github.com/osmlab/osm-community-index/issues/374
[#375]: https://github.com/osmlab/osm-community-index/issues/375
[#376]: https://github.com/osmlab/osm-community-index/issues/376
[#377]: https://github.com/osmlab/osm-community-index/issues/377
[#378]: https://github.com/osmlab/osm-community-index/issues/378


# 2.1.1
##### 2020-Apr-13

* Support new resource type `xmpp` ([#347])
* Added resources:
  * Croatia forum, wiki, website ([#346])
  * OSM Japan Slack ([#343])
  * Mailing list and Twitter for DE:Mecklenburg-Western Pomerania ([#342])
  * OSM Greek resources ([#339])
  * Talk-tz mailing list (Tanzania) ([#337])
  * Talk-africa mailing list ([#335])
  * OSM FR-BZH + FR-35 channels ([#330])
* Updated:
  * Fix boundaries of Isle of Man, Guernsey, and Jersey ([#333])
  * Add a custom geojson for Ireland, and use it for Irish resources ([#332])
  * Update URL for YouthMappers George Mason University ([#331])
  * Fix UK East Midlands and Brazil Riograndedosul geojsons ([#329])
  * Fix Ukraine boundary ([#328])
* Removed:
  * OSM-Vancouver-meetup ([#327])

[#327]: https://github.com/osmlab/osm-community-index/issues/327
[#328]: https://github.com/osmlab/osm-community-index/issues/328
[#329]: https://github.com/osmlab/osm-community-index/issues/329
[#330]: https://github.com/osmlab/osm-community-index/issues/330
[#331]: https://github.com/osmlab/osm-community-index/issues/331
[#332]: https://github.com/osmlab/osm-community-index/issues/332
[#333]: https://github.com/osmlab/osm-community-index/issues/333
[#335]: https://github.com/osmlab/osm-community-index/issues/335
[#337]: https://github.com/osmlab/osm-community-index/issues/337
[#339]: https://github.com/osmlab/osm-community-index/issues/339
[#342]: https://github.com/osmlab/osm-community-index/issues/342
[#343]: https://github.com/osmlab/osm-community-index/issues/343
[#346]: https://github.com/osmlab/osm-community-index/issues/346
[#347]: https://github.com/osmlab/osm-community-index/issues/347


# 2.0.0
##### 2020-Jan-15

* Updated:
  * ⚠️  Build environment now requires Node 10 or greater.
  * ⚠️  New approach to specifying locations introduces some breaking changes but shrinks the data significantly. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.  ([#298], [#291])
    * Resource files now use a `locationSet` property to make it easier to specify where the resources are included and excluded.
    * Removed: `countryCodes` properties
    * Removed: `featureId` properties and most `.geojson` files (everything that was just a country or a circular point is now gone, as it can be calculated)
    * This approach leverages code from [country-coder](https://github.com/rapideditor/country-coder) and [location-conflation](https://github.com/rapideditor/location-conflation) projects.
    * `dist/features.json` is now a FeatureCollection that only contains the _custom_ boundaries.
  * You can now view the community index data on a map at https://openstreetmap.community

[#291]: https://github.com/osmlab/osm-community-index/issues/291
[#298]: https://github.com/osmlab/osm-community-index/issues/298

* Added resources:
  * Many Telegram channels from the OSM wiki ([#220])
  * OSM Italy Piemonte resources ([#313])
  * AASTU Youth Mappers and OSM Ethiopia Telegram ([#321], [#317])
  * Mapeado Colaborativo, Geoinquietos Zaragoza ([#325])
  * Moldova OSM Telegram group and Google Groups group ([#326])
  * OSM Latin America Resources ([#324])
  * OSM Viersen meetup ([#320])
  * OSM South Africa Twitter and Mailing List ([#318])
  * OSM Slovak resources ([#310])
  * OSM Germany Matrix ([#308], [#307])
  * OSM Kerala resources ([#288], [#290], [#304])
  * OSM Bulgaria resources ([#303])
  * MappingWR Waterloo ([#302])
  * OSM Spain and OSM Albania Twitter accounts ([#301])
  * OSM China Telegram ([#294])
  * OSM Hungary Matrix ([#299])

[#220]: https://github.com/osmlab/osm-community-index/issues/220
[#288]: https://github.com/osmlab/osm-community-index/issues/288
[#290]: https://github.com/osmlab/osm-community-index/issues/290
[#294]: https://github.com/osmlab/osm-community-index/issues/294
[#299]: https://github.com/osmlab/osm-community-index/issues/299
[#301]: https://github.com/osmlab/osm-community-index/issues/301
[#302]: https://github.com/osmlab/osm-community-index/issues/302
[#303]: https://github.com/osmlab/osm-community-index/issues/303
[#304]: https://github.com/osmlab/osm-community-index/issues/304
[#307]: https://github.com/osmlab/osm-community-index/issues/307
[#308]: https://github.com/osmlab/osm-community-index/issues/308
[#310]: https://github.com/osmlab/osm-community-index/issues/310
[#313]: https://github.com/osmlab/osm-community-index/issues/313
[#317]: https://github.com/osmlab/osm-community-index/issues/317
[#318]: https://github.com/osmlab/osm-community-index/issues/318
[#320]: https://github.com/osmlab/osm-community-index/issues/320
[#321]: https://github.com/osmlab/osm-community-index/issues/321
[#324]: https://github.com/osmlab/osm-community-index/issues/324
[#325]: https://github.com/osmlab/osm-community-index/issues/325
[#326]: https://github.com/osmlab/osm-community-index/issues/326

* Updated resources:
  * OSM Kosovo ([#312], [#323])
  * Fixed location of Rio Grande do Sol ([#315])
  * Fixed typo and boundary polygon for UK East Midlands ([#314])
  * Update contact and add Telegram for OSM Ghana ([#306])
  * Fixed boundary polygon for Northern Scotland ([#297])
  * Fixed several Canadian resources ([#296])
  * Fixed language codes `ua`->`uk` for Ukranian ([#292])
  * Bump OSM Poland forum priority ([#287])

[#287]: https://github.com/osmlab/osm-community-index/issues/287
[#292]: https://github.com/osmlab/osm-community-index/issues/292
[#296]: https://github.com/osmlab/osm-community-index/issues/296
[#297]: https://github.com/osmlab/osm-community-index/issues/297
[#306]: https://github.com/osmlab/osm-community-index/issues/306
[#312]: https://github.com/osmlab/osm-community-index/issues/312
[#314]: https://github.com/osmlab/osm-community-index/issues/314
[#315]: https://github.com/osmlab/osm-community-index/issues/315
[#323]: https://github.com/osmlab/osm-community-index/issues/323

* Added events:
  * State of the Map 2020 ([#322], [#319])

[#322]: https://github.com/osmlab/osm-community-index/issues/322
[#319]: https://github.com/osmlab/osm-community-index/issues/319


# 1.0.0
##### 2019-Oct-23

* New:
  * Features now include an automatically calculated `area` property, making it easier for downstream projects to sort resources by area ([#286])
    * ⚠️  This new property breaks backward compatibility of the `combined.geojson` files.
  * Add an `osm-lc` type and `osm-lc.svg` icon for official OSM Local Chapters (see [#1])
  * Resources now support an `order` property, to allow communities to control how their resources are sorted ([#114])
  * Resource `contacts` property is now optional

[#286]: https://github.com/osmlab/osm-community-index/issues/286
[#114]: https://github.com/osmlab/osm-community-index/issues/114
[#1]: https://github.com/osmlab/osm-community-index/issues/1

* Added resources:
  * Several Telegram groups: OSM Africa, Bosnia-Herzegovina, Japan, Taiwan, DE-Hamburg, France, Netherlands, Israel, Saudi Arabia ([#220])
  * Map Kibera, OSM Kenya ([#278], [#279])
  * OSM Ukraine ([#277])
  * OSM Ireland ([#275], [#282])
  * OSM Scotland ([#271], [#283])
  * OSM Galicia ([#265], [#266], [#267], [#268])
  * OSM Netherlands ([#264], [#270], [#274])
  * OSM Switzerland ([#262], [#263], [#284])
  * OSM Belgium ([#255], [#256], [#257], [#258], [#259], [#260], [#269])

[#220]: https://github.com/osmlab/osm-community-index/issues/220
[#255]: https://github.com/osmlab/osm-community-index/issues/255
[#256]: https://github.com/osmlab/osm-community-index/issues/256
[#257]: https://github.com/osmlab/osm-community-index/issues/257
[#258]: https://github.com/osmlab/osm-community-index/issues/258
[#259]: https://github.com/osmlab/osm-community-index/issues/259
[#260]: https://github.com/osmlab/osm-community-index/issues/260
[#261]: https://github.com/osmlab/osm-community-index/issues/261
[#262]: https://github.com/osmlab/osm-community-index/issues/262
[#263]: https://github.com/osmlab/osm-community-index/issues/263
[#264]: https://github.com/osmlab/osm-community-index/issues/264
[#265]: https://github.com/osmlab/osm-community-index/issues/265
[#266]: https://github.com/osmlab/osm-community-index/issues/266
[#267]: https://github.com/osmlab/osm-community-index/issues/267
[#268]: https://github.com/osmlab/osm-community-index/issues/268
[#269]: https://github.com/osmlab/osm-community-index/issues/269
[#270]: https://github.com/osmlab/osm-community-index/issues/270
[#271]: https://github.com/osmlab/osm-community-index/issues/271
[#274]: https://github.com/osmlab/osm-community-index/issues/274
[#275]: https://github.com/osmlab/osm-community-index/issues/275
[#277]: https://github.com/osmlab/osm-community-index/issues/277
[#278]: https://github.com/osmlab/osm-community-index/issues/278
[#279]: https://github.com/osmlab/osm-community-index/issues/279
[#282]: https://github.com/osmlab/osm-community-index/issues/282
[#283]: https://github.com/osmlab/osm-community-index/issues/283
[#284]: https://github.com/osmlab/osm-community-index/issues/284

* Added events:
  * SOTM Asia 2019 ([#280], [#281])

[#280]: https://github.com/osmlab/osm-community-index/issues/280
[#281]: https://github.com/osmlab/osm-community-index/issues/281

* Removed resources:
  * OSM NYC ([#252])

[#252]: https://github.com/osmlab/osm-community-index/issues/252

* Updated:
  * Simplify several features and cleanup seams:  India, Venezuela, France, Netherlands, Galicia, Belgium, Switzerland, Luxembourg, Iceland, Portugal, Asia/Africa border
  * Simplify all of the YouthMappers chapter circular boundaries
  * Make a `middle-east` folder and move Jordan, Saudi Arabia, Israel into it
  * Fix name of Khulna University YouthMappers (was just named "OpenStreetMap" before)
  * Fix typo `nugeria` -> `nigeria`
  * Cleanup and simplify YouthMappers logo ([#285])
  * Include Sardinia in Italy feature ([#261])
  * Korean resources now use a single polygon including both North and South ([#254])

[#254]: https://github.com/osmlab/osm-community-index/issues/254
[#261]: https://github.com/osmlab/osm-community-index/issues/261
[#285]: https://github.com/osmlab/osm-community-index/issues/285


# 0.12.0
##### 2019-Aug-26

* Updates:
  * Refine the outlines of UPRI and FeuTech YouthMappers regions [#248], [#249])

[#248]: https://github.com/osmlab/osm-community-index/issues/248
[#249]: https://github.com/osmlab/osm-community-index/issues/249


# 0.11.0
##### 2019-Aug-01

* Distribute `combined.geojson` containing all resources and features
(useful for displaying everything on a map, re: [#79])

[#79]: https://github.com/osmlab/osm-community-index/issues/79


# 0.10.0
##### 2019-Jul-26

* Add resources:
  * Add resources for OSM Nicaragua ([#246])
  * Add GeoGeeks Western Australia and GeoGeeks Perth ([#243], [#244])
  * Add resources for OSM Venezuela ([#242])
  * Add resources for OSM Luxembourg ([#239])

* Updates:
  * Fix Chile boundary multipolygon

[#239]: https://github.com/osmlab/osm-community-index/issues/239
[#242]: https://github.com/osmlab/osm-community-index/issues/242
[#243]: https://github.com/osmlab/osm-community-index/issues/243
[#244]: https://github.com/osmlab/osm-community-index/issues/244
[#246]: https://github.com/osmlab/osm-community-index/issues/246


# 0.9.0
##### 2019-Jun-30

* Add resources:
  * Add resources for OSM Portugal ([#235])

* Updates:
  * Fix URL for NYU Mobile Health YouthMappers ([#238])

[#238]: https://github.com/osmlab/osm-community-index/issues/238
[#235]: https://github.com/osmlab/osm-community-index/issues/235

## 0.8.0
##### 2019-Jun-17

* Update Resources:
  * Maptime Australia -> Maptime Oceania, add talk-nz ([#232])

* Add Resources:
  * Add OpenStreetMap Uruguay ([#227])

[#232]: https://github.com/osmlab/osm-community-index/issues/232
[#227]: https://github.com/osmlab/osm-community-index/issues/227


## 0.7.0
##### 2019-May-21

* New Features:
  * Add all YouthMappers chapters, and support for `youthmappers` community type ([#224], [#152])

* Add Resources:
  * Add OpenStreetMap Slovenia Twitter ([#226])

* Add events:
  * State of the Map US 2019

[#226]: https://github.com/osmlab/osm-community-index/issues/226
[#224]: https://github.com/osmlab/osm-community-index/issues/224
[#152]: https://github.com/osmlab/osm-community-index/issues/152


## 0.6.0
##### 2019-Jan-23

* New Features:
  * Add support for `aparat` community type ([#212])

* Add Resources:
  * Add Norwegian Telegram ([#213])
  * Add Iran resources: Telegram, Aparat, Forum ([#210])
  * A few renames: "Korea" -> "South Korea",  "Srilanka" -> "Sri Lanka" ([#205], [#206])
  * OSM Asia community ([#203])

[#213]: https://github.com/osmlab/osm-community-index/issues/213
[#212]: https://github.com/osmlab/osm-community-index/issues/212
[#210]: https://github.com/osmlab/osm-community-index/issues/210
[#206]: https://github.com/osmlab/osm-community-index/issues/206
[#205]: https://github.com/osmlab/osm-community-index/issues/205
[#203]: https://github.com/osmlab/osm-community-index/issues/203


## 0.5.0
##### 2018-Dec-03

* New features:
  * Add support for new community types `github`, `osm`, `wiki`, `youtube` ([#200])
* Add resources:
  * Add resources for OSM India ([#198], [#199])
* Remove resources:
  * Remove Maptime Belgium ([#197])

[#200]: https://github.com/osmlab/osm-community-index/issues/200
[#199]: https://github.com/osmlab/osm-community-index/issues/199
[#198]: https://github.com/osmlab/osm-community-index/issues/198
[#197]: https://github.com/osmlab/osm-community-index/issues/197


## 0.4.8
##### 2018-Nov-26

* Add community resources:
  * Add Kosovo Telegram group ([#194])
  * Add Maptime HRVA Twitter ([#191])
  * Add polygons for several Indian states ([#186], [#187], [#188], [#189], [#190])
  * Add link to IRC channel ([#181])
  * Add link to Discord ([#183])
* Updates:
  * Fix croatia.geojson from LineString to Polygon ([#195])
  * Update Puducherry, India OSM community's mailing list ([#185])
  * Switch IRC links to use webchat.oftc.net ([#136], [#184])
  * Fix OSM-LATAM bounding polygon ([iD#5282])

[#194]: https://github.com/osmlab/osm-community-index/issues/194
[#191]: https://github.com/osmlab/osm-community-index/issues/191
[#190]: https://github.com/osmlab/osm-community-index/issues/190
[#189]: https://github.com/osmlab/osm-community-index/issues/189
[#188]: https://github.com/osmlab/osm-community-index/issues/188
[#187]: https://github.com/osmlab/osm-community-index/issues/187
[#186]: https://github.com/osmlab/osm-community-index/issues/186
[#183]: https://github.com/osmlab/osm-community-index/issues/183
[#181]: https://github.com/osmlab/osm-community-index/issues/181
[#195]: https://github.com/osmlab/osm-community-index/issues/195
[#185]: https://github.com/osmlab/osm-community-index/issues/185
[#184]: https://github.com/osmlab/osm-community-index/issues/184
[#136]: https://github.com/osmlab/osm-community-index/issues/136
[iD#5282]: https://github.com/openstreetmap/iD/issues/5282


## 0.4.7
##### 2018-Aug-26

* Add community resources:
  * OSM Rio Grande Telegram Group ([#176])
  * OSM LATAM ([#171], [#172])
  * Iceland ([#170])
  * Botswana ([#170])
* Add events:
  * State of the Map LATAM 2018
* Updates:
  * Update OSM-US Slack join URL ([#169])

[#176]: https://github.com/osmlab/osm-community-index/issues/176
[#172]: https://github.com/osmlab/osm-community-index/issues/172
[#171]: https://github.com/osmlab/osm-community-index/issues/171
[#170]: https://github.com/osmlab/osm-community-index/issues/170
[#169]: https://github.com/osmlab/osm-community-index/issues/169


## 0.4.6
##### 2018-Jul-26

* Add community resources:
  * Talk-us-massachusetts mailing list ([#168])
  * Portland, Oregon Google group ([#167])

[#168]: https://github.com/osmlab/osm-community-index/issues/168
[#167]: https://github.com/osmlab/osm-community-index/issues/167


## 0.4.5
##### 2018-Jun-25

* Add community resources:
  * Slovenia ([#161])
  * Croatia ([#158])
* Add events:
  * State of the Map US 2018 ([#164])

[#164]: https://github.com/osmlab/osm-community-index/issues/164
[#161]: https://github.com/osmlab/osm-community-index/issues/161
[#158]: https://github.com/osmlab/osm-community-index/issues/158


## 0.4.4
##### 2018-Jun-13

* Add community resources:
  * Czech web, Facebook, Twitter ([#156])
  * German Telegram supergroup ([#155])
  * OSM global Telegram supergroup ([#154])
  * Thailand Facebook page ([#153])
* Fixes:
  * Fix contact email address for OSM Korea Telegram contact ([#151])
  * Simplified Maptime Albania-Tirana polygon ([#149])

[#156]: https://github.com/osmlab/osm-community-index/issues/156
[#155]: https://github.com/osmlab/osm-community-index/issues/155
[#154]: https://github.com/osmlab/osm-community-index/issues/154
[#153]: https://github.com/osmlab/osm-community-index/issues/153
[#151]: https://github.com/osmlab/osm-community-index/issues/151
[#149]: https://github.com/osmlab/osm-community-index/issues/149


## 0.4.3
##### 2018-May-14
* Fixes:
  * Fix Maptime Tirana polygon ([#147])

[#147]: https://github.com/osmlab/osm-community-index/issues/147


## 0.4.2
##### 2018-May-14
* Add community resources:
  * Finland ([#146])
  * OSM Italy Telegram ([#144])
  * OSM Hungary Meetup ([#143])
  * OSM Belgium Maptime ([#142])
  * Albania ([#141])
  * Chiang Mai, Thailand Meetup ([#139])
  * Thailand ([#138])
  * OSM UK feature polygons ([#137])
  * OSM Paraguay Telegram ([#134])
  * OSM Ecuador Telegram ([#133])
  * OSM Cuba Telegram ([#132])
  * OSM Nicuragua Telegram ([#131])
  * OSM Colombia Telegram ([#130])
  * Several Belgium resources and improvements ([#126], [#125], [#120])
  * OSM.jp Website ([#124])
  * OSM Malaysia Facebook ([#119])
  * Germany Ostwestfalen mailing lists ([#118])
  * Hungary ([#116])
  * Denmark ([#115])
* Fixes:
  * Replace irc2go links with irc.openstreetmap.org links ([#136])
  * Fix OSM Bangladesh url ([#128])
  * Fix OSM Berlin Meetup url ([#122])
  * Fix OSM Brazil Meetup time ([#121])

[#146]: https://github.com/osmlab/osm-community-index/issues/146
[#144]: https://github.com/osmlab/osm-community-index/issues/144
[#143]: https://github.com/osmlab/osm-community-index/issues/143
[#142]: https://github.com/osmlab/osm-community-index/issues/142
[#141]: https://github.com/osmlab/osm-community-index/issues/141
[#139]: https://github.com/osmlab/osm-community-index/issues/139
[#138]: https://github.com/osmlab/osm-community-index/issues/138
[#137]: https://github.com/osmlab/osm-community-index/issues/137
[#136]: https://github.com/osmlab/osm-community-index/issues/136
[#134]: https://github.com/osmlab/osm-community-index/issues/134
[#133]: https://github.com/osmlab/osm-community-index/issues/133
[#132]: https://github.com/osmlab/osm-community-index/issues/132
[#131]: https://github.com/osmlab/osm-community-index/issues/131
[#130]: https://github.com/osmlab/osm-community-index/issues/130
[#128]: https://github.com/osmlab/osm-community-index/issues/128
[#126]: https://github.com/osmlab/osm-community-index/issues/126
[#125]: https://github.com/osmlab/osm-community-index/issues/125
[#124]: https://github.com/osmlab/osm-community-index/issues/124
[#122]: https://github.com/osmlab/osm-community-index/issues/122
[#121]: https://github.com/osmlab/osm-community-index/issues/121
[#120]: https://github.com/osmlab/osm-community-index/issues/120
[#119]: https://github.com/osmlab/osm-community-index/issues/119
[#118]: https://github.com/osmlab/osm-community-index/issues/118
[#116]: https://github.com/osmlab/osm-community-index/issues/116
[#115]: https://github.com/osmlab/osm-community-index/issues/115


## 0.4.1
##### 2018-Apr-24
* Add community resources:
  * Brasilia Telegram ([#112])
  * Facebook, Twitter, OSMF, and help.openstreetmap.com ([#103])
  * Korean Telegram ([#110])
  * UK East and West Midlands meetups, talk-gb and irc channel ([#102], [#107])
  * OSM Graz ([#106])
  * talk-it-trentino and talk-it-southtyrol mailing lists ([#104], [#105])
  * Berlin, Germany ([#100])
  * Italy ([#99])
  * Bolivia ([#98])
  * Peru ([#97])
  * Austria web forum ([#96])
  * Sweden ([#87], [#95])
  * Norway ([#94])
  * Updates to Argentina resources ([#91], [#92])
  * Puducherry, India ([#89])
  * Malaysia ([#86])
  * Colombia ([#85])
  * Ghana ([#84])
  * France ([#83])
  * Spain talk-es ([#81])
  * Belgium meetup groups ([#76])
  * Myanmar ([#75])
* Add events:
  * Brazilian meetups ([#112])
  * State of the Map World 2018
  * State of the Map Asia 2018 ([#88])

[#112]: https://github.com/osmlab/osm-community-index/issues/112
[#110]: https://github.com/osmlab/osm-community-index/issues/110
[#107]: https://github.com/osmlab/osm-community-index/issues/107
[#106]: https://github.com/osmlab/osm-community-index/issues/106
[#105]: https://github.com/osmlab/osm-community-index/issues/105
[#104]: https://github.com/osmlab/osm-community-index/issues/104
[#103]: https://github.com/osmlab/osm-community-index/issues/103
[#102]: https://github.com/osmlab/osm-community-index/issues/102
[#100]: https://github.com/osmlab/osm-community-index/issues/100
[#99]: https://github.com/osmlab/osm-community-index/issues/99
[#98]: https://github.com/osmlab/osm-community-index/issues/98
[#97]: https://github.com/osmlab/osm-community-index/issues/97
[#96]: https://github.com/osmlab/osm-community-index/issues/96
[#95]: https://github.com/osmlab/osm-community-index/issues/95
[#94]: https://github.com/osmlab/osm-community-index/issues/94
[#92]: https://github.com/osmlab/osm-community-index/issues/92
[#91]: https://github.com/osmlab/osm-community-index/issues/91
[#89]: https://github.com/osmlab/osm-community-index/issues/89
[#88]: https://github.com/osmlab/osm-community-index/issues/88
[#87]: https://github.com/osmlab/osm-community-index/issues/87
[#86]: https://github.com/osmlab/osm-community-index/issues/86
[#85]: https://github.com/osmlab/osm-community-index/issues/85
[#84]: https://github.com/osmlab/osm-community-index/issues/84
[#83]: https://github.com/osmlab/osm-community-index/issues/83
[#81]: https://github.com/osmlab/osm-community-index/issues/81
[#76]: https://github.com/osmlab/osm-community-index/issues/76
[#75]: https://github.com/osmlab/osm-community-index/issues/75


## 0.4.0
##### 2018-Apr-16
* Add community resources:
  * Germany ([#69], [#72])
  * Rome and Lazio meetups ([#68], [#67])
  * Austria ([#64])
  * Chile ([#56], [#57], [#58], [#59])
  * OSM-CA Slack and OSM Ottawa meetup ([#63], [#51])
  * Madagascar ([#53])
  * MapMinnesota ([#55])
  * Bangladesh, India, Indonesia, Mongolia, Nepal, Sri Lanka ([#48])
  * Brazil and Bahia ([#47])
  * Update Australia geojson and add mailing list ([#45])
* Add geojson-precision, drop precison of geojsons to 5 digits ([#70])
* Validate that event dates are pareseable ([#62])
* Fix winding order of all geojsons
* Support types "discord" and "matrix" (e.g. riot chat) ([#49])

[#72]: https://github.com/osmlab/osm-community-index/issues/72
[#70]: https://github.com/osmlab/osm-community-index/issues/70
[#69]: https://github.com/osmlab/osm-community-index/issues/69
[#68]: https://github.com/osmlab/osm-community-index/issues/68
[#67]: https://github.com/osmlab/osm-community-index/issues/67
[#64]: https://github.com/osmlab/osm-community-index/issues/64
[#63]: https://github.com/osmlab/osm-community-index/issues/63
[#62]: https://github.com/osmlab/osm-community-index/issues/62
[#59]: https://github.com/osmlab/osm-community-index/issues/59
[#58]: https://github.com/osmlab/osm-community-index/issues/58
[#57]: https://github.com/osmlab/osm-community-index/issues/57
[#56]: https://github.com/osmlab/osm-community-index/issues/56
[#55]: https://github.com/osmlab/osm-community-index/issues/55
[#53]: https://github.com/osmlab/osm-community-index/issues/53
[#51]: https://github.com/osmlab/osm-community-index/issues/51
[#49]: https://github.com/osmlab/osm-community-index/issues/49
[#48]: https://github.com/osmlab/osm-community-index/issues/48
[#47]: https://github.com/osmlab/osm-community-index/issues/47
[#45]: https://github.com/osmlab/osm-community-index/issues/45


## 0.3.0
##### 2018-Apr-03
* Add several communities:
  * Czech Republic ([#43])
  * Spain ([#44])
  * Taiwan ([#42], [#41])
  * Japan ([#40])
  * Vancouver, BC ([#39])
  * Argentina ([#38])
  * Belarus ([#33])
  * India ([#28])
  * Many metro regions around US ([#27])
  * Australia ([#17])
  * Russia ([#11])
  * Philippines ([#9])
* Add FontAwesome icons for each resource type (see [#1], [#31])
* Add support for tracking events ([#25])
* Resources don't require `featureId` anymore (world resources won't have one)
* Separate "url" (required) and "signupUrl" (optional) ([#20])
* Include both "description" (one line) and "extendedDescription" ([#20])
* Add upcoming events ([#25])

[#44]: https://github.com/osmlab/osm-community-index/issues/44
[#43]: https://github.com/osmlab/osm-community-index/issues/43
[#42]: https://github.com/osmlab/osm-community-index/issues/42
[#41]: https://github.com/osmlab/osm-community-index/issues/41
[#40]: https://github.com/osmlab/osm-community-index/issues/40
[#39]: https://github.com/osmlab/osm-community-index/issues/39
[#38]: https://github.com/osmlab/osm-community-index/issues/38
[#33]: https://github.com/osmlab/osm-community-index/issues/33
[#31]: https://github.com/osmlab/osm-community-index/issues/31
[#28]: https://github.com/osmlab/osm-community-index/issues/28
[#27]: https://github.com/osmlab/osm-community-index/issues/27
[#25]: https://github.com/osmlab/osm-community-index/issues/25
[#20]: https://github.com/osmlab/osm-community-index/issues/20
[#17]: https://github.com/osmlab/osm-community-index/issues/17
[#11]: https://github.com/osmlab/osm-community-index/issues/11
[#9]: https://github.com/osmlab/osm-community-index/issues/9
[#1]: https://github.com/osmlab/osm-community-index/issues/1


## 0.2.0
##### 2018-Mar-19
* Don't check in built files on master ([#26])
* Automatically prettify source JSON files ([#22])
* Raise an error if we detect duplicate ids ([#21])

[#26]: https://github.com/osmlab/osm-community-index/issues/26
[#22]: https://github.com/osmlab/osm-community-index/issues/22
[#21]: https://github.com/osmlab/osm-community-index/issues/21

## 0.1.0
##### 2018-Mar-14
* Add languageCodes to track languages spoken. ([#6])
* Require points of contact for resources ([#12])
* Separate data (resources) and polygons (features) ([#7])

[#12]: https://github.com/osmlab/osm-community-index/issues/12
[#7]: https://github.com/osmlab/osm-community-index/issues/7
[#6]: https://github.com/osmlab/osm-community-index/issues/6
