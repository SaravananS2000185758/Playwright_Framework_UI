# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: automationExcercise.spec.ts >> Automation Excercise Page Tests >> @regression Verify Automation Excercise Page successfully-02
- Location: test\ui\specs\automationExcercise.spec.ts:12:7

# Error details

```
TimeoutError: page.waitForLoadState: Timeout 3000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e5]:
      - link "Website for automation practice" [ref=e8] [cursor=pointer]:
        - /url: /
        - img "Website for automation practice" [ref=e9]
      - list [ref=e12]:
        - listitem [ref=e13]:
          - link " Home" [ref=e14] [cursor=pointer]:
            - /url: /
            - generic [ref=e15]: 
            - text: Home
        - listitem [ref=e16]:
          - link " Products" [ref=e17] [cursor=pointer]:
            - /url: /products
            - generic [ref=e18]: 
            - text: Products
        - listitem [ref=e19]:
          - link " Cart" [ref=e20] [cursor=pointer]:
            - /url: /view_cart
            - generic [ref=e21]: 
            - text: Cart
        - listitem [ref=e22]:
          - link " Signup / Login" [ref=e23] [cursor=pointer]:
            - /url: /login
            - generic [ref=e24]: 
            - text: Signup / Login
        - listitem [ref=e25]:
          - link " Test Cases" [ref=e26] [cursor=pointer]:
            - /url: /test_cases
            - generic [ref=e27]: 
            - text: Test Cases
        - listitem [ref=e28]:
          - link " API Testing" [ref=e29] [cursor=pointer]:
            - /url: /api_list
            - generic [ref=e30]: 
            - text: API Testing
        - listitem [ref=e31]:
          - link " Video Tutorials" [ref=e32] [cursor=pointer]:
            - /url: https://www.youtube.com/c/AutomationExercise
            - generic [ref=e33]: 
            - text: Video Tutorials
        - listitem [ref=e34]:
          - link " Contact us" [ref=e35] [cursor=pointer]:
            - /url: /contact_us
            - generic [ref=e36]: 
            - text: Contact us
  - generic [ref=e41]:
    - list [ref=e42]:
      - listitem [ref=e43] [cursor=pointer]
      - listitem [ref=e44] [cursor=pointer]
      - listitem [ref=e45] [cursor=pointer]
    - generic [ref=e46]:
      - generic:
        - generic [ref=e47]:
          - heading "AutomationExercise" [level=1] [ref=e48]
          - heading "Full-Fledged practice website for Automation Engineers" [level=2] [ref=e49]
          - paragraph [ref=e50]:
            - text: All QA engineers can use this website for automation practice and API testing either they are at beginner or advance level. This is for everybody to help them brush up their automation skills.
            - link "Automation skill assessment" [ref=e51] [cursor=pointer]:
              - img [ref=e53]
              - text: Automation skill assessment
          - link "Test Cases" [ref=e55] [cursor=pointer]:
            - /url: /test_cases
            - button "Test Cases" [ref=e56]
          - link "APIs list for practice" [ref=e57] [cursor=pointer]:
            - /url: /api_list
            - button "APIs list for practice" [ref=e58]
        - img "demo website for practice" [ref=e60]
    - link "" [ref=e61] [cursor=pointer]:
      - /url: "#slider-carousel"
      - generic [ref=e62]: 
    - link "" [ref=e63] [cursor=pointer]:
      - /url: "#slider-carousel"
      - generic [ref=e64]: 
  - generic [ref=e67]:
    - generic [ref=e69]:
      - heading "Category" [level=2] [ref=e70]
      - generic [ref=e71]:
        - heading " Women" [level=4] [ref=e74]:
          - link " Women" [ref=e75] [cursor=pointer]:
            - /url: "#Women"
            - generic [ref=e77]: 
            - text: Women
        - heading " Men" [level=4] [ref=e80]:
          - link " Men" [ref=e81] [cursor=pointer]:
            - /url: "#Men"
            - generic [ref=e83]: 
            - text: Men
        - heading " Kids" [level=4] [ref=e86]:
          - link " Kids" [ref=e87] [cursor=pointer]:
            - /url: "#Kids"
            - generic [ref=e89]: 
            - text: Kids
      - insertion [ref=e91]:
        - iframe [ref=e93]:
          - iframe [ref=f7e1]:
            - generic [active]:
              - generic [ref=f9e1]:
                - generic [ref=f9e2]:
                  - generic:
                    - img [ref=f9e6] [cursor=pointer]
                    - button [ref=f9e8] [cursor=pointer]:
                      - img [ref=f9e9]
                - insertion [ref=f9e16]:
                  - generic [ref=f9e17]:
                    - link "Click Here" [ref=f9e18] [cursor=pointer]:
                      - /url: https://googleads.g.doubleclick.net/dbm/clk?sa=L&ai=CvSFrqOc7aoCYL7KM9fwP08KdkAnx-_bqhQG397T3ohWvgbrj1wIQASD9tJ6VAWDlgoCA2A6gAYviiqAByAEJqAMByAObBKoEnAJP0Hpcd59b7EU_OqnUk8Lizaz7rPtDaNlZzS_k-FX4sdxzzOHaVhqPdxUa3e3FF74aF2E48IJYCSKHiwuljNNeXgbBd8l5k4rEZqPn4zhvDxuT61Gupu-a_3F61-c2akUV5mmbqZaacM3kTHZr7fYKXuEhcxzOYGSSX3PI7bluAs14v-4Pgr3jK0eMTwTX9dA6sPOT1Gcb8fiOYDtS9fcsgOnqMmTU5T72VjfG4bNz022cgsoLfzKN8Orz5WPCFKRtu1vuVW7HxFYQXcuvhL1DSqOrmoWJC2IaFOspDOPsRl91qr6WC7WlwPcDvnVfiypmkk6XEMzbMIjRKf-6pH6lkuLMDt2Rmdv0oPZMpiPuWBzaAtX--J2AJUyLCMAE7pzYgsEE4AQDiAWZx4_9TZAGAaAGTYAH3Z313wKoB6fMsQKoB6a-G6gHzM6xAqgH89EbqAeW2BuoB6qbsQKoB47OG6gHk9gbqAfw4BuoB-6WsQKoB_6esQKoB6--sQKoB9XJG6gH2baxAqgHmgaoB_-esQKoB9-fsQKoB_jCsQKoB_vCsQKoB-fXsQLYBwDSCDMIgGEQARifAzIIioKAgICAgAg6D4BAgMCAgICAqIACqIOAEEi9_cE6WKTr25yJoJUDYAGACgGYCwHICwGADAGqDQJJTuoNEwiwktyciaCVAxUyRp0JHVNhB5LwDQGIDgmwE_7s5yLQEwDYEw2IFAHYFAHQFQHKFgIKAPgWAYAXAbIXBBgCUAayGAkSAp1jGE0iAQDQGQHYGQE&ae=1&num=1&cid=CAQSjAIAEQoqgcARIhQ2K3dJB_gVJMF1OpucFC4U67sgPuxe6e4yYhEqKOmQnTWuvXIFz0N1kEEJvzl8DErUoAtUB-ZYCkjEbtG96niuZwDAOA_O_TMaJhci8zwUnkame3AJi3eFyePkFHhFvOWPDvdtHgobmY2PzBEyKsxp4TOpCFJa5egHLQIzjn4NLojIwXooEuaJDdZ_5LUMupgahifX0E-jXioWKeWfAu6d3drfNvma0819ZGgGwvP7oJIqYyNZ9s6y7Gu1oNOESIKbrqiQoMkPde0xRS4ZAIcTOnwCj5yeJ7luGlxL80bNLplf8vd4RCRyy0VAVNoLS4HEcbBvA1nGikFhrk9cQvkFzZRCGAE&sig=AOD64_2ZiDoElvRL0HKpm8SuRsfoYPZ0Pw&client=ca-pub-1677597403311019&dbm_c=AKAmf-CpLnGy56KKDi00yalhPJ3DsJmTDyUpnNvyaVQGtQyqaBfkpdSX7AfSZF2YLY5aXVoeuqowESbS6ys6grdor4loOMD8bd8418ABgXiUGhsqRkv82HUJMRhstynWwVwtBDQ1ZS1A48MipOid6dJs70vStL1wauTZimHCkx0PIuontTkXA1cejvb12YJuics8faazRG2ahoDftsj5AvlUk6G2_hTOpBtSMox5evZ-VZzmN1hx67jwav_VRUrFwjADovxUg7zXHrPEwoDulAX6M9MhpT-zzA&cry=1&dbm_d=AKAmf-DAJQ7ed4LctAaYRhWiXz0hqPv0flKl7fOdTfWWicUopMpiqBMirolVjfuPe1aAwNaHMJnoXFnllZSqNZom2q9ZoEF_vt6HpbURuCB7Cw8wT7j-W7qyn5SFObrmFHaH5MMvMJ7NfWik3C4Rhqz6Y-PPAzckYadbVJXnuBlcRrQc7fyw16qHr60ZIlTr_cekF-zeb2b1vdHF3-_V8LySWRiXQDdZ98oVtfuUz10hdz4Z1tGmEm4_EuKFGPk79lYvETxrATmNdP0JBICyCwvb9MIZFvfhQIZpM4oaVOEd4aiaM7kq7yPKEenFfzPPNhBoY3QhPtaHaw1zhdMS04y7XvNLy3UKZZJc02VVNiEQJJXJt_lskQa5BZapnhaQ5uNcE63wQGP0AVyygcgEI5ihEmMxuSIXH7Shb_Q5W-iqftUb9aBAJTyjyu_hFOs1z0BgX81ZjtpA73OXA5TBPiOsU7pGgIqkRQPJq1-VOOq1d3aWH0kxH9ZLatXC8Cnx6RiBi4DqHmfNeziiMUdQtZvEUBDR1QQpnA4jEs6kHIQbkOmFxEUBO8vqQKvJSZWv6_DdkfJ9pKtFgy57dQ0OHrOKUXGXPyIBQ82Q8rIoQIYT6vArlfpaPiEFz33IOPNxv7pZIAs_wAn47yqD5M7zOyepjDeFAiFcWgdIGHKfipwSkVRciJ8T12kizhToOowDfo1IaH44VHof&adurl=https://servedby.flashtalking.com/click/7/296969;10262949;6106230;210;0/?us_privacy=!!US_PRIVACY!&gdpr=0&ft_partnerimpid=ABAjH0jEYXE9w4sZ-gMoTLSf47ZF&ft_impID=B8450CEE-BC80-E41B-9678-8DE02E89F8DD&ft_section=20931928985&g=67495165C4BB7A&random=1212.707556846046&ft_width=160&ft_height=600&url=https://www.adobe.com/in/creativecloud.html?sdid=PC1PQ9XF&mv=display&mv2=display
                      - img "Click Here" [ref=f9e19]
                    - link "AdChoices arrow" [ref=f9e21] [cursor=pointer]:
                      - /url: https://www.flashtalking.com/consumer-privacy
                      - img "AdChoices arrow" [ref=f9e22]
                    - link "Privacy Notification" [ref=f9e24] [cursor=pointer]:
                      - /url: https://www.flashtalking.com/consumer-privacy
                      - img [ref=f9e25]
                    - link "Privacy Notification" [ref=f9e27] [cursor=pointer]:
                      - /url: https://www.flashtalking.com/consumer-privacy
                      - img [ref=f9e28]
              - iframe
              - iframe [ref=f9e29]:
                
              - iframe [ref=f9e30]:
                
              - iframe [ref=f9e31]:
                
              - iframe [ref=f9e32]:
                
              - iframe [ref=f9e33]:
                
      - generic [ref=e94]:
        - heading "Brands" [level=2] [ref=e95]
        - list [ref=e97]:
          - listitem [ref=e98]:
            - link "(6) Polo" [ref=e99] [cursor=pointer]:
              - /url: /brand_products/Polo
              - generic [ref=e100]: (6)
              - text: Polo
          - listitem [ref=e101]:
            - link "(5) H&M" [ref=e102] [cursor=pointer]:
              - /url: /brand_products/H&M
              - generic [ref=e103]: (5)
              - text: H&M
          - listitem [ref=e104]:
            - link "(5) Madame" [ref=e105] [cursor=pointer]:
              - /url: /brand_products/Madame
              - generic [ref=e106]: (5)
              - text: Madame
          - listitem [ref=e107]:
            - link "(3) Mast & Harbour" [ref=e108] [cursor=pointer]:
              - /url: /brand_products/Mast & Harbour
              - generic [ref=e109]: (3)
              - text: Mast & Harbour
          - listitem [ref=e110]:
            - link "(4) Babyhug" [ref=e111] [cursor=pointer]:
              - /url: /brand_products/Babyhug
              - generic [ref=e112]: (4)
              - text: Babyhug
          - listitem [ref=e113]:
            - link "(3) Allen Solly Junior" [ref=e114] [cursor=pointer]:
              - /url: /brand_products/Allen Solly Junior
              - generic [ref=e115]: (3)
              - text: Allen Solly Junior
          - listitem [ref=e116]:
            - link "(3) Kookie Kids" [ref=e117] [cursor=pointer]:
              - /url: /brand_products/Kookie Kids
              - generic [ref=e118]: (3)
              - text: Kookie Kids
          - listitem [ref=e119]:
            - link "(5) Biba" [ref=e120] [cursor=pointer]:
              - /url: /brand_products/Biba
              - generic [ref=e121]: (5)
              - text: Biba
    - generic [ref=e122]:
      - generic [ref=e123]:
        - heading "Features Items" [level=2] [ref=e124]
        - generic [ref=e126]:
          - generic [ref=e127]:
            - generic [ref=e128]:
              - img "ecommerce website products" [ref=e129]
              - heading "Rs. 500" [level=2] [ref=e130]
              - paragraph [ref=e131]: Blue Top
              - generic [ref=e132] [cursor=pointer]:
                - generic [ref=e133]: 
                - text: Add to cart
            - generic [ref=e134]:
              - heading "Rs. 500" [level=2] [ref=e135]
              - paragraph [ref=e136]: Blue Top
              - generic [ref=e137] [cursor=pointer]:
                - generic [ref=e138]: 
                - text: Add to cart
          - list [ref=e140]:
            - listitem [ref=e141]:
              - link " View Product" [ref=e142] [cursor=pointer]:
                - /url: /product_details/1
                - generic [ref=e143]: 
                - text: View Product
        - generic [ref=e145]:
          - generic [ref=e146]:
            - generic [ref=e147]:
              - img "ecommerce website products" [ref=e148]
              - heading "Rs. 400" [level=2] [ref=e149]
              - paragraph [ref=e150]: Men Tshirt
              - generic [ref=e151] [cursor=pointer]:
                - generic [ref=e152]: 
                - text: Add to cart
            - generic [ref=e153]:
              - heading "Rs. 400" [level=2] [ref=e154]
              - paragraph [ref=e155]: Men Tshirt
              - generic [ref=e156] [cursor=pointer]:
                - generic [ref=e157]: 
                - text: Add to cart
          - list [ref=e159]:
            - listitem [ref=e160]:
              - link " View Product" [ref=e161] [cursor=pointer]:
                - /url: /product_details/2
                - generic [ref=e162]: 
                - text: View Product
        - generic [ref=e164]:
          - generic [ref=e165]:
            - generic [ref=e166]:
              - img "ecommerce website products" [ref=e167]
              - heading "Rs. 1000" [level=2] [ref=e168]
              - paragraph [ref=e169]: Sleeveless Dress
              - generic [ref=e170] [cursor=pointer]:
                - generic [ref=e171]: 
                - text: Add to cart
            - generic [ref=e172]:
              - heading "Rs. 1000" [level=2] [ref=e173]
              - paragraph [ref=e174]: Sleeveless Dress
              - generic [ref=e175] [cursor=pointer]:
                - generic [ref=e176]: 
                - text: Add to cart
          - list [ref=e178]:
            - listitem [ref=e179]:
              - link " View Product" [ref=e180] [cursor=pointer]:
                - /url: /product_details/3
                - generic [ref=e181]: 
                - text: View Product
        - generic [ref=e183]:
          - generic [ref=e184]:
            - generic [ref=e185]:
              - img "ecommerce website products" [ref=e186]
              - heading "Rs. 1500" [level=2] [ref=e187]
              - paragraph [ref=e188]: Stylish Dress
              - generic [ref=e189] [cursor=pointer]:
                - generic [ref=e190]: 
                - text: Add to cart
            - generic [ref=e191]:
              - heading "Rs. 1500" [level=2] [ref=e192]
              - paragraph [ref=e193]: Stylish Dress
              - generic [ref=e194] [cursor=pointer]:
                - generic [ref=e195]: 
                - text: Add to cart
          - list [ref=e197]:
            - listitem [ref=e198]:
              - link " View Product" [ref=e199] [cursor=pointer]:
                - /url: /product_details/4
                - generic [ref=e200]: 
                - text: View Product
        - generic [ref=e202]:
          - generic [ref=e203]:
            - generic [ref=e204]:
              - img "ecommerce website products" [ref=e205]
              - heading "Rs. 600" [level=2] [ref=e206]
              - paragraph [ref=e207]: Winter Top
              - generic [ref=e208] [cursor=pointer]:
                - generic [ref=e209]: 
                - text: Add to cart
            - generic [ref=e210]:
              - heading "Rs. 600" [level=2] [ref=e211]
              - paragraph [ref=e212]: Winter Top
              - generic [ref=e213] [cursor=pointer]:
                - generic [ref=e214]: 
                - text: Add to cart
          - list [ref=e216]:
            - listitem [ref=e217]:
              - link " View Product" [ref=e218] [cursor=pointer]:
                - /url: /product_details/5
                - generic [ref=e219]: 
                - text: View Product
        - generic [ref=e221]:
          - generic [ref=e222]:
            - generic [ref=e223]:
              - img "ecommerce website products" [ref=e224]
              - heading "Rs. 400" [level=2] [ref=e225]
              - paragraph [ref=e226]: Summer White Top
              - generic [ref=e227] [cursor=pointer]:
                - generic [ref=e228]: 
                - text: Add to cart
            - generic [ref=e229]:
              - heading "Rs. 400" [level=2] [ref=e230]
              - paragraph [ref=e231]: Summer White Top
              - generic [ref=e232] [cursor=pointer]:
                - generic [ref=e233]: 
                - text: Add to cart
          - list [ref=e235]:
            - listitem [ref=e236]:
              - link " View Product" [ref=e237] [cursor=pointer]:
                - /url: /product_details/6
                - generic [ref=e238]: 
                - text: View Product
        - generic [ref=e240]:
          - generic [ref=e241]:
            - generic [ref=e242]:
              - img "ecommerce website products" [ref=e243]
              - heading "Rs. 1000" [level=2] [ref=e244]
              - paragraph [ref=e245]: Madame Top For Women
              - generic [ref=e246] [cursor=pointer]:
                - generic [ref=e247]: 
                - text: Add to cart
            - generic [ref=e248]:
              - heading "Rs. 1000" [level=2] [ref=e249]
              - paragraph [ref=e250]: Madame Top For Women
              - generic [ref=e251] [cursor=pointer]:
                - generic [ref=e252]: 
                - text: Add to cart
          - list [ref=e254]:
            - listitem [ref=e255]:
              - link " View Product" [ref=e256] [cursor=pointer]:
                - /url: /product_details/7
                - generic [ref=e257]: 
                - text: View Product
        - generic [ref=e259]:
          - generic [ref=e260]:
            - generic [ref=e261]:
              - img "ecommerce website products" [ref=e262]
              - heading "Rs. 700" [level=2] [ref=e263]
              - paragraph [ref=e264]: Fancy Green Top
              - generic [ref=e265] [cursor=pointer]:
                - generic [ref=e266]: 
                - text: Add to cart
            - generic [ref=e267]:
              - heading "Rs. 700" [level=2] [ref=e268]
              - paragraph [ref=e269]: Fancy Green Top
              - generic [ref=e270] [cursor=pointer]:
                - generic [ref=e271]: 
                - text: Add to cart
          - list [ref=e273]:
            - listitem [ref=e274]:
              - link " View Product" [ref=e275] [cursor=pointer]:
                - /url: /product_details/8
                - generic [ref=e276]: 
                - text: View Product
        - generic [ref=e278]:
          - generic [ref=e279]:
            - generic [ref=e280]:
              - img "ecommerce website products" [ref=e281]
              - heading "Rs. 499" [level=2] [ref=e282]
              - paragraph [ref=e283]:
                - text: Sleeves Printed Top - White
                - link "Website hosting plans" [ref=e284] [cursor=pointer]:
                  - img [ref=e286]
                  - text: Website hosting plans
              - generic [ref=e288] [cursor=pointer]:
                - generic [ref=e289]: 
                - text: Add to cart
            - generic [ref=e290]:
              - heading "Rs. 499" [level=2] [ref=e291]
              - paragraph [ref=e292]: Sleeves Printed Top - White
              - generic [ref=e293] [cursor=pointer]:
                - generic [ref=e294]: 
                - text: Add to cart
          - list [ref=e296]:
            - listitem [ref=e297]:
              - link " View Product" [ref=e298] [cursor=pointer]:
                - /url: /product_details/11
                - generic [ref=e299]: 
                - text: View Product
        - generic [ref=e301]:
          - generic [ref=e302]:
            - generic [ref=e303]:
              - img "ecommerce website products" [ref=e304]
              - heading "Rs. 359" [level=2] [ref=e305]
              - paragraph [ref=e306]:
                - text: Half Sleeves Top Schiffli Detailing - Pink
                - link "QA engineer recruitment" [ref=e307] [cursor=pointer]:
                  - img [ref=e309]
                  - text: QA engineer recruitment
              - generic [ref=e311] [cursor=pointer]:
                - generic [ref=e312]: 
                - text: Add to cart
            - generic [ref=e313]:
              - heading "Rs. 359" [level=2] [ref=e314]
              - paragraph [ref=e315]: Half Sleeves Top Schiffli Detailing - Pink
              - generic [ref=e316] [cursor=pointer]:
                - generic [ref=e317]: 
                - text: Add to cart
          - list [ref=e319]:
            - listitem [ref=e320]:
              - link " View Product" [ref=e321] [cursor=pointer]:
                - /url: /product_details/12
                - generic [ref=e322]: 
                - text: View Product
        - generic [ref=e324]:
          - generic [ref=e325]:
            - generic [ref=e326]:
              - img "ecommerce website products" [ref=e327]
              - heading "Rs. 278" [level=2] [ref=e328]
              - paragraph [ref=e329]: Frozen Tops For Kids
              - generic [ref=e330] [cursor=pointer]:
                - generic [ref=e331]: 
                - text: Add to cart
            - generic [ref=e332]:
              - heading "Rs. 278" [level=2] [ref=e333]
              - paragraph [ref=e334]: Frozen Tops For Kids
              - generic [ref=e335] [cursor=pointer]:
                - generic [ref=e336]: 
                - text: Add to cart
          - list [ref=e338]:
            - listitem [ref=e339]:
              - link " View Product" [ref=e340] [cursor=pointer]:
                - /url: /product_details/13
                - generic [ref=e341]: 
                - text: View Product
        - generic [ref=e343]:
          - generic [ref=e344]:
            - generic [ref=e345]:
              - img "ecommerce website products" [ref=e346]
              - heading "Rs. 679" [level=2] [ref=e347]
              - paragraph [ref=e348]:
                - text: Full Sleeves Top Cherry - Pink
                - link "API testing platform" [ref=e349] [cursor=pointer]:
                  - img [ref=e351]
                  - text: API testing platform
              - generic [ref=e353] [cursor=pointer]:
                - generic [ref=e354]: 
                - text: Add to cart
            - generic [ref=e355]:
              - heading "Rs. 679" [level=2] [ref=e356]
              - paragraph [ref=e357]: Full Sleeves Top Cherry - Pink
              - generic [ref=e358] [cursor=pointer]:
                - generic [ref=e359]: 
                - text: Add to cart
          - list [ref=e361]:
            - listitem [ref=e362]:
              - link " View Product" [ref=e363] [cursor=pointer]:
                - /url: /product_details/14
                - generic [ref=e364]: 
                - text: View Product
        - generic [ref=e366]:
          - generic [ref=e367]:
            - generic [ref=e368]:
              - img "ecommerce website products" [ref=e369]
              - heading "Rs. 315" [level=2] [ref=e370]
              - paragraph [ref=e371]: Printed Off Shoulder Top - White
              - generic [ref=e372] [cursor=pointer]:
                - generic [ref=e373]: 
                - text: Add to cart
            - generic [ref=e374]:
              - heading "Rs. 315" [level=2] [ref=e375]
              - paragraph [ref=e376]: Printed Off Shoulder Top - White
              - generic [ref=e377] [cursor=pointer]:
                - generic [ref=e378]: 
                - text: Add to cart
          - list [ref=e380]:
            - listitem [ref=e381]:
              - link " View Product" [ref=e382] [cursor=pointer]:
                - /url: /product_details/15
                - generic [ref=e383]: 
                - text: View Product
        - generic [ref=e385]:
          - generic [ref=e386]:
            - generic [ref=e387]:
              - img "ecommerce website products" [ref=e388]
              - heading "Rs. 478" [level=2] [ref=e389]
              - paragraph [ref=e390]: Sleeves Top and Short - Blue & Pink
              - generic [ref=e391] [cursor=pointer]:
                - generic [ref=e392]: 
                - text: Add to cart
            - generic [ref=e393]:
              - heading "Rs. 478" [level=2] [ref=e394]
              - paragraph [ref=e395]: Sleeves Top and Short - Blue & Pink
              - generic [ref=e396] [cursor=pointer]:
                - generic [ref=e397]: 
                - text: Add to cart
          - list [ref=e399]:
            - listitem [ref=e400]:
              - link " View Product" [ref=e401] [cursor=pointer]:
                - /url: /product_details/16
                - generic [ref=e402]: 
                - text: View Product
        - generic [ref=e404]:
          - generic [ref=e405]:
            - generic [ref=e406]:
              - img "ecommerce website products" [ref=e407]
              - heading "Rs. 1200" [level=2] [ref=e408]
              - paragraph [ref=e409]: Little Girls Mr. Panda Shirt
              - generic [ref=e410] [cursor=pointer]:
                - generic [ref=e411]: 
                - text: Add to cart
            - generic [ref=e412]:
              - heading "Rs. 1200" [level=2] [ref=e413]
              - paragraph [ref=e414]: Little Girls Mr. Panda Shirt
              - generic [ref=e415] [cursor=pointer]:
                - generic [ref=e416]: 
                - text: Add to cart
          - list [ref=e418]:
            - listitem [ref=e419]:
              - link " View Product" [ref=e420] [cursor=pointer]:
                - /url: /product_details/18
                - generic [ref=e421]: 
                - text: View Product
        - generic [ref=e423]:
          - generic [ref=e424]:
            - generic [ref=e425]:
              - img "ecommerce website products" [ref=e426]
              - heading "Rs. 1050" [level=2] [ref=e427]
              - paragraph [ref=e428]:
                - text: Sleeveless Unicorn Patch Gown - Pink
                - link "QA engineer bootcamp" [ref=e429] [cursor=pointer]:
                  - img [ref=e431]
                  - text: QA engineer bootcamp
              - generic [ref=e433] [cursor=pointer]:
                - generic [ref=e434]: 
                - text: Add to cart
            - generic [ref=e435]:
              - heading "Rs. 1050" [level=2] [ref=e436]
              - paragraph [ref=e437]: Sleeveless Unicorn Patch Gown - Pink
              - generic [ref=e438] [cursor=pointer]:
                - generic [ref=e439]: 
                - text: Add to cart
          - list [ref=e441]:
            - listitem [ref=e442]:
              - link " View Product" [ref=e443] [cursor=pointer]:
                - /url: /product_details/19
                - generic [ref=e444]: 
                - text: View Product
        - generic [ref=e446]:
          - generic [ref=e447]:
            - generic [ref=e448]:
              - img "ecommerce website products" [ref=e449]
              - heading "Rs. 1190" [level=2] [ref=e450]
              - paragraph [ref=e451]: Cotton Mull Embroidered Dress
              - generic [ref=e452] [cursor=pointer]:
                - generic [ref=e453]: 
                - text: Add to cart
            - generic [ref=e454]:
              - heading "Rs. 1190" [level=2] [ref=e455]
              - paragraph [ref=e456]: Cotton Mull Embroidered Dress
              - generic [ref=e457] [cursor=pointer]:
                - generic [ref=e458]: 
                - text: Add to cart
          - list [ref=e460]:
            - listitem [ref=e461]:
              - link " View Product" [ref=e462] [cursor=pointer]:
                - /url: /product_details/20
                - generic [ref=e463]: 
                - text: View Product
        - generic [ref=e465]:
          - generic [ref=e466]:
            - generic [ref=e467]:
              - img "ecommerce website products" [ref=e468]
              - heading "Rs. 1530" [level=2] [ref=e469]
              - paragraph [ref=e470]: Blue Cotton Indie Mickey Dress
              - generic [ref=e471] [cursor=pointer]:
                - generic [ref=e472]: 
                - text: Add to cart
            - generic [ref=e473]:
              - heading "Rs. 1530" [level=2] [ref=e474]
              - paragraph [ref=e475]: Blue Cotton Indie Mickey Dress
              - generic [ref=e476] [cursor=pointer]:
                - generic [ref=e477]: 
                - text: Add to cart
          - list [ref=e479]:
            - listitem [ref=e480]:
              - link " View Product" [ref=e481] [cursor=pointer]:
                - /url: /product_details/21
                - generic [ref=e482]: 
                - text: View Product
        - generic [ref=e484]:
          - generic [ref=e485]:
            - generic [ref=e486]:
              - img "ecommerce website products" [ref=e487]
              - heading "Rs. 1600" [level=2] [ref=e488]
              - paragraph [ref=e489]:
                - text: Long Maxi Tulle Fancy Dress Up Outfits -Pink
                - link "T-Shirts" [ref=e490] [cursor=pointer]:
                  - img [ref=e492]
                  - text: T-Shirts
              - generic [ref=e494] [cursor=pointer]:
                - generic [ref=e495]: 
                - text: Add to cart
            - generic [ref=e496]:
              - heading "Rs. 1600" [level=2] [ref=e497]
              - paragraph [ref=e498]: Long Maxi Tulle Fancy Dress Up Outfits -Pink
              - generic [ref=e499] [cursor=pointer]:
                - generic [ref=e500]: 
                - text: Add to cart
          - list [ref=e502]:
            - listitem [ref=e503]:
              - link " View Product" [ref=e504] [cursor=pointer]:
                - /url: /product_details/22
                - generic [ref=e505]: 
                - text: View Product
        - generic [ref=e507]:
          - generic [ref=e508]:
            - generic [ref=e509]:
              - img "ecommerce website products" [ref=e510]
              - heading "Rs. 1100" [level=2] [ref=e511]
              - paragraph [ref=e512]: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
              - generic [ref=e513] [cursor=pointer]:
                - generic [ref=e514]: 
                - text: Add to cart
            - generic [ref=e515]:
              - heading "Rs. 1100" [level=2] [ref=e516]
              - paragraph [ref=e517]: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
              - generic [ref=e518] [cursor=pointer]:
                - generic [ref=e519]: 
                - text: Add to cart
          - list [ref=e521]:
            - listitem [ref=e522]:
              - link " View Product" [ref=e523] [cursor=pointer]:
                - /url: /product_details/23
                - generic [ref=e524]: 
                - text: View Product
        - generic [ref=e526]:
          - generic [ref=e527]:
            - generic [ref=e528]:
              - img "ecommerce website products" [ref=e529]
              - heading "Rs. 849" [level=2] [ref=e530]
              - paragraph [ref=e531]: Colour Blocked Shirt – Sky Blue
              - generic [ref=e532] [cursor=pointer]:
                - generic [ref=e533]: 
                - text: Add to cart
            - generic [ref=e534]:
              - heading "Rs. 849" [level=2] [ref=e535]
              - paragraph [ref=e536]: Colour Blocked Shirt – Sky Blue
              - generic [ref=e537] [cursor=pointer]:
                - generic [ref=e538]: 
                - text: Add to cart
          - list [ref=e540]:
            - listitem [ref=e541]:
              - link " View Product" [ref=e542] [cursor=pointer]:
                - /url: /product_details/24
                - generic [ref=e543]: 
                - text: View Product
        - generic [ref=e545]:
          - generic [ref=e546]:
            - generic [ref=e547]:
              - img "ecommerce website products" [ref=e548]
              - heading "Rs. 1299" [level=2] [ref=e549]
              - paragraph [ref=e550]: Pure Cotton V-Neck T-Shirt
              - generic [ref=e551] [cursor=pointer]:
                - generic [ref=e552]: 
                - text: Add to cart
            - generic [ref=e553]:
              - heading "Rs. 1299" [level=2] [ref=e554]
              - paragraph [ref=e555]: Pure Cotton V-Neck T-Shirt
              - generic [ref=e556] [cursor=pointer]:
                - generic [ref=e557]: 
                - text: Add to cart
          - list [ref=e559]:
            - listitem [ref=e560]:
              - link " View Product" [ref=e561] [cursor=pointer]:
                - /url: /product_details/28
                - generic [ref=e562]: 
                - text: View Product
        - generic [ref=e564]:
          - generic [ref=e565]:
            - generic [ref=e566]:
              - img "ecommerce website products" [ref=e567]
              - heading "Rs. 1000" [level=2] [ref=e568]
              - paragraph [ref=e569]: Green Side Placket Detail T-Shirt
              - generic [ref=e570] [cursor=pointer]:
                - generic [ref=e571]: 
                - text: Add to cart
            - generic [ref=e572]:
              - heading "Rs. 1000" [level=2] [ref=e573]
              - paragraph [ref=e574]: Green Side Placket Detail T-Shirt
              - generic [ref=e575] [cursor=pointer]:
                - generic [ref=e576]: 
                - text: Add to cart
          - list [ref=e578]:
            - listitem [ref=e579]:
              - link " View Product" [ref=e580] [cursor=pointer]:
                - /url: /product_details/29
                - generic [ref=e581]: 
                - text: View Product
        - generic [ref=e583]:
          - generic [ref=e584]:
            - generic [ref=e585]:
              - img "ecommerce website products" [ref=e586]
              - heading "Rs. 1500" [level=2] [ref=e587]
              - paragraph [ref=e588]: Premium Polo T-Shirts
              - generic [ref=e589] [cursor=pointer]:
                - generic [ref=e590]: 
                - text: Add to cart
            - generic [ref=e591]:
              - heading "Rs. 1500" [level=2] [ref=e592]
              - paragraph [ref=e593]: Premium Polo T-Shirts
              - generic [ref=e594] [cursor=pointer]:
                - generic [ref=e595]: 
                - text: Add to cart
          - list [ref=e597]:
            - listitem [ref=e598]:
              - link " View Product" [ref=e599] [cursor=pointer]:
                - /url: /product_details/30
                - generic [ref=e600]: 
                - text: View Product
        - generic [ref=e602]:
          - generic [ref=e603]:
            - generic [ref=e604]:
              - img "ecommerce website products" [ref=e605]
              - heading "Rs. 850" [level=2] [ref=e606]
              - paragraph [ref=e607]: Pure Cotton Neon Green Tshirt
              - generic [ref=e608] [cursor=pointer]:
                - generic [ref=e609]: 
                - text: Add to cart
            - generic [ref=e610]:
              - heading "Rs. 850" [level=2] [ref=e611]
              - paragraph [ref=e612]: Pure Cotton Neon Green Tshirt
              - generic [ref=e613] [cursor=pointer]:
                - generic [ref=e614]: 
                - text: Add to cart
          - list [ref=e616]:
            - listitem [ref=e617]:
              - link " View Product" [ref=e618] [cursor=pointer]:
                - /url: /product_details/31
                - generic [ref=e619]: 
                - text: View Product
        - generic [ref=e621]:
          - generic [ref=e622]:
            - generic [ref=e623]:
              - img "ecommerce website products" [ref=e624]
              - heading "Rs. 799" [level=2] [ref=e625]
              - paragraph [ref=e626]: Soft Stretch Jeans
              - generic [ref=e627] [cursor=pointer]:
                - generic [ref=e628]: 
                - text: Add to cart
            - generic [ref=e629]:
              - heading "Rs. 799" [level=2] [ref=e630]
              - paragraph [ref=e631]: Soft Stretch Jeans
              - generic [ref=e632] [cursor=pointer]:
                - generic [ref=e633]: 
                - text: Add to cart
          - list [ref=e635]:
            - listitem [ref=e636]:
              - link " View Product" [ref=e637] [cursor=pointer]:
                - /url: /product_details/33
                - generic [ref=e638]: 
                - text: View Product
        - generic [ref=e640]:
          - generic [ref=e641]:
            - generic [ref=e642]:
              - img "ecommerce website products" [ref=e643]
              - heading "Rs. 1200" [level=2] [ref=e644]
              - paragraph [ref=e645]: Regular Fit Straight Jeans
              - generic [ref=e646] [cursor=pointer]:
                - generic [ref=e647]: 
                - text: Add to cart
            - generic [ref=e648]:
              - heading "Rs. 1200" [level=2] [ref=e649]
              - paragraph [ref=e650]: Regular Fit Straight Jeans
              - generic [ref=e651] [cursor=pointer]:
                - generic [ref=e652]: 
                - text: Add to cart
          - list [ref=e654]:
            - listitem [ref=e655]:
              - link " View Product" [ref=e656] [cursor=pointer]:
                - /url: /product_details/35
                - generic [ref=e657]: 
                - text: View Product
        - generic [ref=e659]:
          - generic [ref=e660]:
            - generic [ref=e661]:
              - img "ecommerce website products" [ref=e662]
              - heading "Rs. 1400" [level=2] [ref=e663]
              - paragraph [ref=e664]: Grunt Blue Slim Fit Jeans
              - generic [ref=e665] [cursor=pointer]:
                - generic [ref=e666]: 
                - text: Add to cart
            - generic [ref=e667]:
              - heading "Rs. 1400" [level=2] [ref=e668]
              - paragraph [ref=e669]: Grunt Blue Slim Fit Jeans
              - generic [ref=e670] [cursor=pointer]:
                - generic [ref=e671]: 
                - text: Add to cart
          - list [ref=e673]:
            - listitem [ref=e674]:
              - link " View Product" [ref=e675] [cursor=pointer]:
                - /url: /product_details/37
                - generic [ref=e676]: 
                - text: View Product
        - generic [ref=e678]:
          - generic [ref=e679]:
            - generic [ref=e680]:
              - img "ecommerce website products" [ref=e681]
              - heading "Rs. 2300" [level=2] [ref=e682]
              - paragraph [ref=e683]: Rose Pink Embroidered Maxi Dress
              - generic [ref=e684] [cursor=pointer]:
                - generic [ref=e685]: 
                - text: Add to cart
            - generic [ref=e686]:
              - heading "Rs. 2300" [level=2] [ref=e687]
              - paragraph [ref=e688]: Rose Pink Embroidered Maxi Dress
              - generic [ref=e689] [cursor=pointer]:
                - generic [ref=e690]: 
                - text: Add to cart
          - list [ref=e692]:
            - listitem [ref=e693]:
              - link " View Product" [ref=e694] [cursor=pointer]:
                - /url: /product_details/38
                - generic [ref=e695]: 
                - text: View Product
        - generic [ref=e697]:
          - generic [ref=e698]:
            - generic [ref=e699]:
              - img "ecommerce website products" [ref=e700]
              - heading "Rs. 3000" [level=2] [ref=e701]
              - paragraph [ref=e702]: Cotton Silk Hand Block Print Saree
              - generic [ref=e703] [cursor=pointer]:
                - generic [ref=e704]: 
                - text: Add to cart
            - generic [ref=e705]:
              - heading "Rs. 3000" [level=2] [ref=e706]
              - paragraph [ref=e707]: Cotton Silk Hand Block Print Saree
              - generic [ref=e708] [cursor=pointer]:
                - generic [ref=e709]: 
                - text: Add to cart
          - list [ref=e711]:
            - listitem [ref=e712]:
              - link " View Product" [ref=e713] [cursor=pointer]:
                - /url: /product_details/39
                - generic [ref=e714]: 
                - text: View Product
        - generic [ref=e716]:
          - generic [ref=e717]:
            - generic [ref=e718]:
              - img "ecommerce website products" [ref=e719]
              - heading "Rs. 3500" [level=2] [ref=e720]
              - paragraph [ref=e721]: Rust Red Linen Saree
              - generic [ref=e722] [cursor=pointer]:
                - generic [ref=e723]: 
                - text: Add to cart
            - generic [ref=e724]:
              - heading "Rs. 3500" [level=2] [ref=e725]
              - paragraph [ref=e726]: Rust Red Linen Saree
              - generic [ref=e727] [cursor=pointer]:
                - generic [ref=e728]: 
                - text: Add to cart
          - list [ref=e730]:
            - listitem [ref=e731]:
              - link " View Product" [ref=e732] [cursor=pointer]:
                - /url: /product_details/40
                - generic [ref=e733]: 
                - text: View Product
        - generic [ref=e735]:
          - generic [ref=e736]:
            - generic [ref=e737]:
              - img "ecommerce website products" [ref=e738]
              - heading "Rs. 5000" [level=2] [ref=e739]
              - paragraph [ref=e740]: Beautiful Peacock Blue Cotton Linen Saree
              - generic [ref=e741] [cursor=pointer]:
                - generic [ref=e742]: 
                - text: Add to cart
            - generic [ref=e743]:
              - heading "Rs. 5000" [level=2] [ref=e744]
              - paragraph [ref=e745]: Beautiful Peacock Blue Cotton Linen Saree
              - generic [ref=e746] [cursor=pointer]:
                - generic [ref=e747]: 
                - text: Add to cart
          - list [ref=e749]:
            - listitem [ref=e750]:
              - link " View Product" [ref=e751] [cursor=pointer]:
                - /url: /product_details/41
                - generic [ref=e752]: 
                - text: View Product
        - generic [ref=e754]:
          - generic [ref=e755]:
            - generic [ref=e756]:
              - img "ecommerce website products" [ref=e757]
              - heading "Rs. 1400" [level=2] [ref=e758]
              - paragraph [ref=e759]: Lace Top For Women
              - generic [ref=e760] [cursor=pointer]:
                - generic [ref=e761]: 
                - text: Add to cart
            - generic [ref=e762]:
              - heading "Rs. 1400" [level=2] [ref=e763]
              - paragraph [ref=e764]: Lace Top For Women
              - generic [ref=e765] [cursor=pointer]:
                - generic [ref=e766]: 
                - text: Add to cart
          - list [ref=e768]:
            - listitem [ref=e769]:
              - link " View Product" [ref=e770] [cursor=pointer]:
                - /url: /product_details/42
                - generic [ref=e771]: 
                - text: View Product
        - generic [ref=e773]:
          - generic [ref=e774]:
            - generic [ref=e775]:
              - img "ecommerce website products" [ref=e776]
              - heading "Rs. 1389" [level=2] [ref=e777]
              - paragraph [ref=e778]:
                - text: GRAPHIC DESIGN MEN
                - link "T SHIRT" [ref=e779] [cursor=pointer]:
                  - /url: "#"
                  - img [ref=e780]
                  - text: T SHIRT
                - text: "- BLUE"
                - link "T-Shirts" [ref=e782] [cursor=pointer]:
                  - img [ref=e784]
                  - text: T-Shirts
              - generic [ref=e786] [cursor=pointer]:
                - generic [ref=e787]: 
                - text: Add to cart
            - generic [ref=e788]:
              - heading "Rs. 1389" [level=2] [ref=e789]
              - paragraph [ref=e790]: GRAPHIC DESIGN MEN T SHIRT - BLUE
              - generic [ref=e791] [cursor=pointer]:
                - generic [ref=e792]: 
                - text: Add to cart
          - list [ref=e794]:
            - listitem [ref=e795]:
              - link " View Product" [ref=e796] [cursor=pointer]:
                - /url: /product_details/43
                - generic [ref=e797]: 
                - text: View Product
      - generic [ref=e798]:
        - heading "recommended items" [level=2] [ref=e799]
        - generic [ref=e800]:
          - generic [ref=e801]:
            - text:   
            - generic:
              - generic [ref=e805]:
                - img "ecommerce website products" [ref=e806]
                - heading "Rs. 1500" [level=2] [ref=e807]
                - paragraph [ref=e808]: Stylish Dress
                - generic [ref=e809] [cursor=pointer]:
                  - generic [ref=e810]: 
                  - text: Add to cart
              - generic [ref=e814]:
                - img "ecommerce website products" [ref=e815]
                - heading "Rs. 600" [level=2] [ref=e816]
                - paragraph [ref=e817]: Winter Top
                - generic [ref=e818] [cursor=pointer]:
                  - generic [ref=e819]: 
                  - text: Add to cart
              - generic [ref=e823]:
                - img "ecommerce website products" [ref=e824]
                - heading "Rs. 400" [level=2] [ref=e825]
                - paragraph [ref=e826]: Summer White Top
                - generic [ref=e827] [cursor=pointer]:
                  - generic [ref=e828]: 
                  - text: Add to cart
          - link "" [ref=e829] [cursor=pointer]:
            - /url: "#recommended-item-carousel"
            - generic [ref=e830]: 
          - link "" [ref=e831] [cursor=pointer]:
            - /url: "#recommended-item-carousel"
            - generic [ref=e832]: 
  - insertion [ref=e834]
  - contentinfo [ref=e836]:
    - generic [ref=e841]:
      - heading "Subscription" [level=2] [ref=e842]
      - generic [ref=e843]:
        - textbox "Your email address" [ref=e844]
        - button "" [ref=e845] [cursor=pointer]:
          - generic [ref=e846]: 
        - paragraph [ref=e847]:
          - text: Get the most recent updates from
          - text: our site and be updated your self...
    - paragraph [ref=e851]: Copyright © 2021 All rights reserved
  - text: 
  - insertion [ref=e852]:
    - iframe [ref=e855]:
      - generic [ref=f8e3]:
        - button [ref=f8e4]:
          - img [ref=f8e5]
        - generic [ref=f8e7]:
          - generic [ref=f8e9]:
            - generic [ref=f8e13]:
              - generic:
                - generic:
                  - generic:
                    - button "Pause video":
                      - img
              - button "Unmute video" [ref=f8e15] [cursor=pointer]
            - button "Replay" [ref=f8e23]:
              - img [ref=f8e25] [cursor=pointer]
            - img [ref=f8e30]
          - button "Learn more" [ref=f8e37] [cursor=pointer]
```

# Test source

```ts
  72  |           ? `✓ ${message}: Element is ${visible ? 'visible' : 'not visible'}`
  73  |           : `✓ Element is ${visible ? 'visible' : 'not visible'}`
  74  |       );
  75  |       return visible;
  76  |     } catch (error) {
  77  |       logger.error(`✗ Failed to check element visibility${this.formatError(message)}`);
  78  |       throw error;
  79  |     }
  80  |   }
  81  | 
  82  |   async isDisabled(locator: Locator | string, message?: string): Promise<boolean> {
  83  |     try {
  84  |       const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  85  |       const disabled = await element.isDisabled();
  86  |       logger.info(
  87  |         message?.trim()
  88  |           ? `✓ ${message}: Element is ${disabled ? 'disabled' : 'enabled'}`
  89  |           : `✓ Element is ${disabled ? 'disabled' : 'enabled'}`
  90  |       );
  91  |       return disabled;
  92  |     } catch (error) {
  93  |       logger.error(`✗ Failed to check element disabled state${this.formatError(message)}`);
  94  |       throw error;
  95  |     }
  96  |   }
  97  | 
  98  |   async isInvisible(locator: Locator | string, message?: string): Promise<boolean> {
  99  |     try {
  100 |       const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  101 |       const invisible = await element.isHidden();
  102 |       logger.info(
  103 |         message?.trim()
  104 |           ? `✓ ${message}: Element is ${invisible ? 'invisible' : 'visible'}`
  105 |           : `✓ Element is ${invisible ? 'invisible' : 'visible'}`
  106 |       );
  107 |       return invisible;
  108 |     } catch (error) {
  109 |       logger.error(`✗ Failed to check element invisibility${this.formatError(message)}`);
  110 |       throw error;
  111 |     }
  112 |   }
  113 | 
  114 |   async getAttribute(locator: Locator | string, attribute: string, message?: string): Promise<string | null> {
  115 |     try {
  116 |       const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  117 |       const value = await element.getAttribute(attribute);
  118 |       logger.info(message?.trim() ? `✓ ${message} '${attribute}': ${value}` : '✓');
  119 |       return value;
  120 |     } catch (error) {
  121 |       logger.error(`✗ Failed to get attribute '${attribute}'${this.formatError(message)}`);
  122 |       throw error;
  123 |     }
  124 |   }
  125 | 
  126 |   async getText(locator: Locator | string, message?: string): Promise<string> {
  127 |     try {
  128 |       const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  129 |       const text = await element.textContent();
  130 |       logger.info(message?.trim() ? `✓ ${message}: ${text}` : '✓');
  131 |       return text || '';
  132 |     } catch (error) {
  133 |       logger.error(`✗ Failed to get element text${this.formatError(message)}`);
  134 |       throw error;
  135 |     }
  136 |   }
  137 | 
  138 |   async hover(locator: Locator | string, message?: string): Promise<void> {
  139 |     try {
  140 |       const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  141 |       await element.hover();
  142 |       logger.info(this.formatSuccess(message));
  143 |     } catch (error) {
  144 |       logger.error(`✗ Failed to hover over element${this.formatError(message)}`);
  145 |       throw error;
  146 |     }
  147 |   }
  148 | 
  149 |   async scrollToElement(locator: Locator | string, message?: string): Promise<void> {
  150 |     try {
  151 |       const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  152 |       await element.scrollIntoViewIfNeeded();
  153 |       logger.info(this.formatSuccess(message));
  154 |     } catch (error) {
  155 |       logger.error(`✗ Failed to scroll to element${this.formatError(message)}`);
  156 |       throw error;
  157 |     }
  158 |   }
  159 | 
  160 |   async navigateTo(url: string, message?: string): Promise<void> {
  161 |     try {
  162 |       await this.page.goto(url);
  163 |       logger.info(this.formatSuccess(message));
  164 |     } catch (error) {
  165 |       logger.error(`✗ Failed to navigate to ${url}${this.formatError(message)}`);
  166 |       throw error;
  167 |     }
  168 |   }
  169 | 
  170 |   async waitForPageLoad(timeout: number = 30000, state: 'load' | 'domcontentloaded' | 'networkidle' = 'load', message?: string): Promise<void> {
  171 |     try {
> 172 |       await this.page.waitForLoadState(state, { timeout });
      |                       ^ TimeoutError: page.waitForLoadState: Timeout 3000ms exceeded.
  173 |       logger.info(message?.trim() ? this.formatSuccess(message) : `✓ Page loaded in ${timeout}ms`);
  174 |     } catch (error) {
  175 |       logger.error(`✗ Page did not load within ${timeout}ms${this.formatError(message)}`);
  176 |       throw error;
  177 |     }
  178 |   }
  179 | 
  180 |   async waitForElement(locator: Locator | string, timeout: number = 5000, message?: string): Promise<void> {
  181 |     try {
  182 |       const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
  183 |       await element.waitFor({ timeout });
  184 |       logger.info(this.formatSuccess(message));
  185 |     } catch (error) {
  186 |       logger.error(`✗ Failed while${this.formatError(message)}`);
  187 |       throw error;
  188 |     }
  189 |   }
  190 | 
  191 |   async waitForElementVisible(locator: Locator | string, timeout: number = 5000, message?: string): Promise<void> {
  192 |     await this.waitForElement(locator, timeout, message);
  193 |   }
  194 | 
  195 |   async refreshPage(message?: string): Promise<void> {
  196 |     try {
  197 |       await this.page.reload();
  198 |       logger.info(this.formatSuccess(message));
  199 |     } catch (error) {
  200 |       logger.error(`✗ Failed to refresh page${this.formatError(message)}`);
  201 |       throw error;
  202 |     }
  203 |   }
  204 | 
  205 |   async pressKey(key: string, message?: string): Promise<void> {
  206 |     try {
  207 |       await this.page.keyboard.press(key);
  208 |       logger.info(this.formatSuccess(message));
  209 |     } catch (error) {
  210 |       logger.error(`✗ Failed to press key: ${key}${this.formatError(message)}`);
  211 |       throw error;
  212 |     }
  213 |   }
  214 | 
  215 |   async wait(milliseconds: number, message?: string): Promise<void> {
  216 |     try {
  217 |       await this.page.waitForTimeout(milliseconds);
  218 |       logger.info(message?.trim() ? `${this.formatSuccess(message)} (${milliseconds}ms)` : `✓ Delayed for ${milliseconds}ms`);
  219 |     } catch (error) {
  220 |       logger.error(`✗ Failed during wait of ${milliseconds}ms${this.formatError(message)}`);
  221 |       throw error;
  222 |     }
  223 |   }
  224 | 
  225 |   async sleep(milliseconds: number, message?: string): Promise<void> {
  226 |     await this.wait(milliseconds, message);
  227 |   }
  228 | }
  229 | 
```