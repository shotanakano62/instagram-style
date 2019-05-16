// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(function(){
    $('#open-login-modal').click(function(){
        $('#login-modal').fadeIn(500);
    });

    $('.signup').click(function(){
        $('#singup-modal').fadeIn(500);
    });

    $('.close-modal').click(function(){
        $('#login-modal').fadeOut(500);
        $('#singup-modal').fadeOut(500);
    });

    
    $('.fa-comments').click(function(){
        var getCommentIconNumber = $(this).attr('id');
        $('#comment-area-' + getCommentIconNumber).show();
    });

    function buildHTML(comment){
        var html = `<div class="comment-header">
                        <img src="${comment.user_image}">
                    </div>
                    <div class="comment-user">
                        <a href="/users/${comment.user_id}/detail}">${comment.user_name}</a>
                    </div>
                    <div class="actual-comment">
                    <p>${comment.content}</p>
                    </div>
                    <div class="comment-created-time">
                        ${comment.created_at}
                    </div>`
        return html;
      }

        var getPostNumber = $('.fa-comments').attr('id');

    $('#new_comment_for_' + getPostNumber).on('submit', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action');
        $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(data){
        var html = buildHTML(data);
        
        $('.comments-' + getPostNumber).append(html).show("slow");
        $('.comment').val('');
      })
      .fail(function(){
        alert('error');
      })
    })

    $('.show_comments_button').click(function(){
        var getPostNumber = $(this).attr('id');
        $('#actual_' + getPostNumber + '.comment-container').show("slow");
        
    });

    /*
    $('#unlikes_for_' + getPostNumber).on('click', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action');
        $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(data){
        var html = buildHTML(data);
        
        $('.comments-' + getPostNumber).append(html).show("slow");
        $('.comment').val('');
      })
      .fail(function(){
        alert('error');
      })
    })
    */

  });