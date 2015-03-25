

/* ---------------------------------------------------- +/

## advertising ##

Code related to the advertising template

/+ ---------------------------------------------------- */

Template.advertising.created = function () {
  //

};

Template.advertising.helpers({
	//nothing fancy, just promote products that you like by refrencing an hand-updated array
	product: function(){
		products = [
			{
				picture:"51Y9FF65M1L.jpg",
				link:"http://www.amazon.com/dp/B0008G2VFI?psc=1"
			},
			{
				picture:"stiga1.jpg",
				link:"http://www.amazon.com/STIGA-Color-Advance-Tennis-Racket/dp/B009SGJB2A/ref=sr_1_16?ie=UTF8&qid=1427128985&sr=8-16"
			},
			{
				picture:"71mreOYJy9L._SL1500_.jpg",
				link:"http://www.amazon.com/Franklin-Sports-1-Star-Table-Tennis/dp/B00CMT9O4K/ref=pd_sim_sg_7?ie=UTF8&refRID=1TRAEEJDAQZ3426C2FG5"
			},
			{
				picture:"71NgWWU9YSS._SL1131_.jpg",
				link:"http://www.amazon.com/Butterfly-Victory-2-Player-Table-Tennis/dp/B000G25HH8/ref=pd_sim_sg_21?ie=UTF8&refRID=1TRAEEJDAQZ3426C2FG5"
			},
			{
				picture:"513biG3IRBL._SL1024_.jpg",
				link:"http://www.amazon.com/Killerspin-JET200-Table-Tennis-Paddle/dp/B002GJY338/ref=pd_sim_sg_6?ie=UTF8&refRID=0DZ04SA30TR5S1618357"
			},
			{
				picture:"71YvOs5xZZL._SL1000_.jpg",
				link:"http://www.amazon.com/dp/B003Z9R0YW?psc=1"
			}
		];
		productsArrayKey=Math.floor(Math.random() * 5) + 1;
    return products[productsArrayKey];
  },
  
});

Template.advertising.rendered = function () {
  //
};

Template.advertising.events({
  //
});