export interface productSearch {
  Product_name: string
  Product_url: string
  Important_information: string
  Availablity: string
  MRP: number
  Selling_Price: string
  Discount: number
  Description: string
  Image_count: number
  Image_url: string
  Rating_value: number
  Rating_count: string
  Review_count: string
  Content_images: number
  Bullet_point: string
  reseller_name: string
  Product_features: ProductFeatures
  bought: string
  extra_images: string[]
  content_num_images_list: string[]
}

export interface ProductFeatures {
  brand_perception: string
  customer_perception: string
  Brand: string
  Motherboard_Compatibility: string
  Case_Type: string
  Recommended_Uses_For_Product: string
  Colour: string
  Manufacturer: string
  Model: string
  Model_Name: string
  Product_Dimensions: string
  Batteries: string
  Item_model_number: string
  Computer_Memory_Type: string
  Hardware_Interface: string
  Compatible_Devices: string
  Mounting_Hardware: string
  Number_of_items: string
  Wattage: string
  Batteries_Included: string
  Batteries_Required: string
  Wireless_Type: string
  Number_of_Ports: string
  Total_USB_ports: string
  Material: string
  Form_Factor: string
  "Does_it_contain_liquid?": string
  Country_of_Origin: string
  Item_Weight: string
  ASIN: string
  Customer_Reviews: string
  Best_Sellers_Rank: string
  Date_First_Available: string
  Packer: string
  Importer: string
  Item_Dimensions_LxWxH: string
  Net_Quantity: string
  Generic_Name: string
  expiry_date: string
}
