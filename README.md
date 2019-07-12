# gradetree

a utility for calculating scores

DISCLAIMER:
Use at your own risk. We cannot guarantee the accuracy of any of the results provided in the calculator. This software comes with no warranty whatsoever.

## How to use


### Specifying an assigment
```
# name of assignment
w <term in ratio e.g. if you have three assignments and their respective weights are 1,2,3 then they will be weighed in a 1:2:3 ratio. So the third assignment will be worth 3x the first and the second 2x the first.> (optional)
f <score: e.g. 97/100> (optional if there are sub assignments)
```

### Specifying sub assignments
use multiple `#`s as shown
```
## name of sub assignment
...
```

### Example

(indentation is optional)
```
# Quarter grade
  ## Test average
  w 40
    ### test 1
    f 97/100
    ### test 2
    f 99/100
    ### test 3
    f 92/100
  ## Quiz average
  w 40
    ### quiz 1
    f 91/100
    ### quiz 2
    f 100/100
    ### quiz 3
    f 98/100
  ##  Participation
  w 20
  f 19.5/20

```
