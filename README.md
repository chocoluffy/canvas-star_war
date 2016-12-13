# Demo
[demo page](http://chocoluffy.com/canvas-star_war/)

# How to make a simple HTML5 Canvas game - star war

1\ create independent obejects like particles, rays and meteors. 

using a coordinates array to contain 5 of their coordinates during their movement, and use it to draw a trailing effect.

using context.save(); context.restore() to temporirly choose difference context setting for use. like a stack.

usig delta, created by subtracting from now and then, to make the movement accord with real time movement, not too fast.

2\ fix bugs

first bug: rays are being accerlated? because I create the, more than once! I should make sure they are created onec.

second bug: rays can't touch monster? because I originally set the touching condition to be the rays[0], which is unreasonable, since I want every rays to be under such test.
so I choose to use a loop to let every ray in rays to go through this test.


* Subscribe to the [shunzhe yu's weibo](http://weibo.com/3320740021/profile?topnav=1&wvr=6)

