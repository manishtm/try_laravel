@extends('admin.layouts.app')
@section('headerClass','')

@push('css')

	<title>Country | {{env('APP_NAME')}}</title>

@endpush
@section('content')

<div class="content ">
   <div class="container-fluid">
      <div class="row">
         <div class="col-6">
            <!-- BEGIN Portlet -->
            <div class="portlet">
               <div class="portlet-header portlet-header-bordered">
                  <h3 class="portlet-title">Add Event</h3>
               </div>
               <div class="portlet-body">
			   	  @include('admin.partials.messages')
                  <form action ="{{route('admin.location.event.addsubmit')}}" method="POST" id="js-add-event-form" enctype="multipart/form-data">
				  	@csrf
					  <div class="form-group">
                     <label for="js-country">Country</label>
                     <select class="form-control" id="js-country" name="country">
                        <option value="">Select </option>
						@foreach($country as $eachCountry)
							<option value="{{$eachCountry->id}}">{{$eachCountry->name}} </option>

						@endforeach

                     	</select>
					 	<span id="js-country-error" class="error invalid-feedback"></span>
					 </div>

                     <div class="form-group">
                        <label for="js-state">State</label>
                        <select class="form-control" id="js-state" name="state">
                          <option value=""> Select </option>
                        </select>
						<span id="js-state-error" class="error invalid-feedback"></span>
                     </div>
                     <div class="form-group">
                        <label for="js-district">District</label>
                        <select class="form-control" id="js-district" name="district">
                          <option value=""> Select </option>
                        </select>
						<span id="js-district-error" class="error invalid-feedback"></span>
                     </div>

                      <div class="form-group">
                          <label for="js-city">City</label>
                          <select class="form-control" id="js-city" name="city">
                              <option value=""> Select </option>
                          </select>
                          <span id="js-city-error" class="error invalid-feedback"></span>
                      </div>

                     <div class="form-group">
                        <label for="js-event">Event</label>
                        <input type="text" class="form-control" id="js-event" placeholder="Enter Event Title" name="title">
						      <span id="js-event-error" class="error invalid-feedback"></span>
                     </div>

                      <div class="form-group">
                          <label for="js-event">Location</label>
                          <input type="text" class="form-control" id="js-event" placeholder="Enter Event Location" name="location">
                          <span id="js-event-error" class="error invalid-feedback"></span>
                      </div>

                      <div class="form-group">
                          <label for="js-event">Address</label>
                          <input type="text" class="form-control" id="js-event" placeholder="Enter Event Address" name="address">
                          <span id="js-event-error" class="error invalid-feedback"></span>
                      </div>

                      <div class="form-group">
                          <label for="js-event">Event From</label>
                          <input type="date" class="form-control" id="js-event" placeholder="Enter Event From" name="event_from">
                          <span id="js-event-error" class="error invalid-feedback"></span>
                      </div>

                      <div class="form-group">
                          <label for="js-event">Event To</label>
                          <input type="date" class="form-control" id="js-event" placeholder="Enter Event To" name="event_to">
                          <span id="js-event-error" class="error invalid-feedback"></span>
                      </div>

                      <div class="form-group">
                          <label for="js-event">Registration From</label>
                          <input type="date" class="form-control" id="js-event" placeholder="Enter Registration From" name="reg_from">
                          <span id="js-event-error" class="error invalid-feedback"></span>
                      </div>

                      <div class="form-group">
                          <label for="js-event">Registration To</label>
                          <input type="date" class="form-control" id="js-event" placeholder="Enter Registration To" name="reg_to">
                          <span id="js-event-error" class="error invalid-feedback"></span>
                      </div>

{{--                      <div class="form-group">--}}
{{--                          <label for="js-event">Select logo to upload:</label>--}}
{{--                      <input type="file" name="logo" id="logo">--}}
{{--                      </div>--}}

                  </form>
				  <div class="form-group">
                        <button class="btn btn-primary mr-2" id="js-btn-submit">Submit</button>
                        <button class="btn btn-default mr-2" id="js-btn-cancel">Cancel</button>
                  </div>
               </div>
            </div>
            <!-- END Portlet -->
         </div>
      </div>
   </div>
</div>

@endsection

@push('js')
  <script type="text/javascript" src="{{asset('assets/js/admin/add-event.js')}}"></script>
<script>
var BASE_URL   = $("#site-url").val();
var CHECK_EVENT_UNIQUE_URL = "{{route('admin.location.event.check-unique')}}";
var EVENT_LISTING_PAGE = "{{route('admin.location.event')}}";



</script>


@endpush