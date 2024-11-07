  
  export class GlobalConstants {
  
  //Message
  public static genericError = "Something Went Wrong. Please try again later";

  public static unauthroized:string = "You are not authorized person to access this page.";


  //Regex
  public static nameRegex :string = "[a-zA-Z0-9]*";
  public static emailRegex :string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
  public static contactNumberRegex:string  = "^[0-9]{10,10}$";
  public static passwordRegex: string = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$";
  public static confirmpasswordRegex: string ="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$";

  //Variable
  public static error:string = "Error";
  }